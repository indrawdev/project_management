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
	var grupDone = Ext.create('Ext.data.Store', {
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
			url: 'dashboard/done'
		}
	});

	var grupProgress = Ext.create('Ext.data.Store', {
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
			url: 'dashboard/progress'
		}
	});

	var grupProblem = Ext.create('Ext.data.Store', {
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
			url: 'dashboard/problem'
		}
	});

	var grupFailed = Ext.create('Ext.data.Store', {
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
			url: 'dashboard/failed'
		}
	});


	// CHARTS
	var chartDone = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 240,
		plugins: {
			ptype: 'chartitemevents',
			moveEvents: true
		},
		store: grupDone,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'DONE',
				fontSize: 13
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
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' PROJECT');
				}
			}
		}
	});

	var chartProgress = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 240,
		store: grupProgress,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'PROGRESS',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#2255AE'],
				stroke: '#1B4184'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' PROJECT');
				}
			}
		}
	});

	var chartProblem = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 240,
		store: grupProblem,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'PROBLEM',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#E0E41E'],
				stroke: '#C3C621'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' PROJECT');
				}
			}
		}
	});

	var chartFailed = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 240,
		store: grupFailed,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'FAILED',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#EF1515'],
				stroke: '#E41E1E'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' PROJECT');
				}
			}
		}
	});

	var frmDashboard = Ext.create('Ext.form.Panel', {
		width: 990,
		border: false,
		frame: true,
		region: 'center',
		title: 'Dashboard',
		items: [{
			anchor: '100%',
			style: 'padding: 1px;',
			border: false,
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'DONE',
						xtype: 'fieldset',
						items: [
							chartDone
						]
					}]
				},{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'PROGRESS',
						xtype: 'fieldset',
						items: [
							chartProgress
						]
					}]
				}]
			},{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'PROBLEM',
						xtype: 'fieldset',
						items: [
							chartProblem
						]
					}]
				},{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'FAILED',
						xtype: 'fieldset',
						items: [
							chartFailed
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