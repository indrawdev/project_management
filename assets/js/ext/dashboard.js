Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager',
	'Ext.ProgressBar',
	'Ext.view.View',
]);

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	Ext.Date.monthNames = [
		'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
		'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOPEMBER', 'DESEMBER'
	];

	var xmonth = Ext.Date.format(new Date(), 'F Y');

	// STORES
	var grupDay = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'dashboard/daily'
		}
	});

	var grupMonth = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'dashboard/monthly'
		}
	});

	var grupPercent = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'dashboard/percent'
		}
	});

	// CHARTS
	var chartDay = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 220,
		store: grupDay,
		axes: [{
			type: 'numeric',
			position: 'left',
			fields: ['value'],
			title: {
				text: 'TOTAL PEMASUKAN',
				fontSize: 11
			},
			grid: true,
			minimum: 0,
			renderer: Ext.util.Format.numberRenderer('0,000,000')
		},{
			type: 'category',
			position: 'bottom',
			fields: ['name'],
			title: {
				text: xmonth,
				fontSize: 12
			}
		}],
		series: [{
			type: 'line',
			style: {
				stroke: '#30BDA7',
				lineWidth: 2
			},
			xField: 'name',
			yField: 'value',
			marker: {
				type: 'path',
				path: ['M', - 4, 0, 0, 4, 4, 0, 0, - 4, 'Z'],
				stroke: '#30BDA7',
				lineWidth: 2,
				fill: 'white'
			}
		},{
			type: 'line',
			fill: true,
			style: {
				fill: '#96D4C6',
				fillOpacity: .6,
				stroke: '#0A3F50',
				strokeOpacity: .6,
			},
			xField: 'name',
			yField: 'value',
			marker: {
				type: 'circle',
				radius: 4,
				lineWidth: 2,
				fill: 'white'
			},
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml('TANGGAL ' + storeItem.get('name') + ' : ' + Ext.util.Format.number(storeItem.get(item.series.getYField()), '0,000,000') + ' IDR');
				}
			}
		}]
	});		

	var chartMonth = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 220,
		plugins: {
			ptype: 'chartitemevents',
			moveEvents: true
		},
		store: grupMonth,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2,
			renderer: Ext.util.Format.numberRenderer('0,000,000')
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: '',
				fontSize: 11
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#54DF14'],
				stroke: '#53C81C'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + Ext.util.Format.number(storeItem.get(item.series.getYField()), '0,000,000') + ' IDR');
				}
			}
		}
	});

	var chartPercent = Ext.create({
		xtype: 'polar',
		width: '100%',
		height: 220,
		theme: 'green',
		interactions: ['rotate', 'itemhighlight'],
		store: grupPercent,
		series: {
			type: 'pie',
			highlight: true,
			angleField: 'value',
			label: {
	  			field: 'name',
	  			display: 'inside',
	  			fontSize: 10
	  		},
	  		tooltip: {
	            trackMouse: true,
	            style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get('value') + ' IDR');
	                }
	        },
	  		xField: 'number',
	  		donut: 30
		}
	});
	
	var frmDashboard = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Dashboard',
		width: 930,
		items: [{
			anchor: '99%',
			style: 'padding: 5px;',
			title: 'Pemasukan Per Hari',
			xtype: 'fieldset',
			items: [
				chartDay
			]
		},{
			anchor: '100%',
			style: 'padding: 1px;',
			border: false,
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.5,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '98%',
						style: 'padding: 4px;',
						title: 'Pemasukan Per Bulan',
						xtype: 'fieldset',
						items: [
							chartMonth
						]
					}]
				},{
					flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '98%',
						style: 'padding: 4px;',
						title: 'Persentasi',
						xtype: 'fieldset',
						items: [
							chartPercent
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmDashboard
	});

	function fnMaskShow() {
		frmDashboard.mask('Please wait...');
	}

	function fnMaskHide() {
		frmDashboard.unmask();
	}
	
	frmDashboard.render(Ext.getBody());
	Ext.get('loading').destroy();
});