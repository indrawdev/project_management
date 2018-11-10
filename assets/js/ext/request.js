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

	Ext.define('DataGridRequest', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_id_project', type: 'string'},
			{name: 'fs_nama_project', type: 'string'},
			{name: 'fd_tanggal_deadline', type: 'string'},
			{name: 'fs_kode_kategori', type: 'string'},
			{name: 'fs_remark', type: 'string'},
			{name: 'fs_nama_status', type: 'string'},
			{name: 'fs_assign_to', type: 'string'}
		]
	});

	// STORES
	var grupRequest = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridRequest',
		pageSize: 25,
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
			url: 'request/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var grupKategori = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'request/select'
		}
	});


	// GRIDS
	var gridRequest = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 300,
		sortableColumns: false,
		store: grupRequest,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Nomor',
			dataIndex: 'fs_nomor',
			menuDisabled: true,
			flex: 0.8
		},{
			text: 'Nama Project',
			dataIndex: 'fs_nama_project',
			menuDisabled: true,
			flex: 3
		},{
			text: 'Deadline',
			dataIndex: 'fd_tanggal_deadline',
			menuDisabled: true,
			flex: 1.5,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Kategori',
			dataIndex: 'fs_nama_kategori',
			menuDisabled: true,
			flex: 2
		},{
			text: 'Status',
			dataIndex: 'fs_nama_status',
			menuDisabled: true,
			flex: 2	
		},{
			text: 'Kode Kategori',
			dataIndex: 'fs_kode_kategori',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Status',
			dataIndex: 'fs_kode_status',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Remark',
			dataIndex: 'fs_remark',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 2.8,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Project',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupRequest.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupRequest
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNomor').setValue(record.get('fs_nomor'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_project'));
				Ext.getCmp('cboDeadline').setValue(record.get('fd_tanggal_deadline'));
				Ext.getCmp('cboKategori').setValue(record.get('fs_kode_kategori'));
				Ext.getCmp('txtRemark').setValue(record.get('fs_remark'));

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1');
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENTS
	var txtNomor = {
		anchor: '98%',
		fieldLabel: 'Nomor',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNomor',
		name: 'txtNomor',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '10',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Nama Project',
		emptyText: 'HURUF KAPITAL',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboDeadline = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		editable: true,
		fieldLabel: 'Tanggal Deadline',
		format: 'd-m-Y',
		id: 'cboDeadline',
		name: 'cboDeadline',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -1),
		xtype: 'datefield',
		value: new Date()
	};

	var txtRemark = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		height : 50,
		fieldLabel: 'Remark',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtRemark',
		name: 'txtRemark',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKategori = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'Kategori',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Kategori',
		fieldStyle: 'text-transform: uppercase;',
		id: 'cboKategori',
		name: 'cboKategori',
		store: grupKategori,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};


	// FUNCTIONS
	function fnReset() {
		Ext.getCmp('txtNomor').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('cboDeadline').setValue(new Date());
		Ext.getCmp('txtRemark').setValue('');
		Ext.getCmp('cboKategori').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'request/ceksave',
				params: {
					'fs_nomor': Ext.getCmp('txtNomor').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'PROJECTS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'PROJECTS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSave();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'PROJECTS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSave() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'request/save',
			params: {
				'fs_nomor': Ext.getCmp('txtNomor').getValue(),
				'fs_nama_project': Ext.getCmp('txtNama').getValue(),
				'fd_tanggal_deadline': Ext.getCmp('cboDeadline').getValue(),
				'fs_kode_kategori': Ext.getCmp('cboKategori').getValue(),
				'fs_remark': Ext.getCmp('txtRemark').getValue(),
				//'fs_assign_to': Ext.getCmp('txtNama').getValue(),
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'PROJECTS'
				});

				if (xtext.sukses === true) {
					// RESET
					fnReset();
					// LOAD DATA
					grupRequest.load();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab2');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'PROJECTS'
				});
				fnMaskHide();
			}
		});
	}

	var frmRequestProject = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Request Project',
		width: 930,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Form Request Project',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: '',
								xtype: 'fieldset',
								items: [
									txtNomor,
									txtNama,
									cboKategori
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: '',
								xtype: 'fieldset',
								items: [
									cboDeadline,
									txtRemark
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveData',
					name: 'btnSaveData',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSave
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnReset
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Project',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						style: 'padding: 5px;',
						title: 'Daftar Project',
						xtype: 'fieldset',
						items: [
							gridRequest
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmRequestProject
	});

	function fnMaskShow() {
		frmRequestProject.mask('Please wait...');
	}

	function fnMaskHide() {
		frmRequestProject.unmask();
	}
	
	frmRequestProject.render(Ext.getBody());
	Ext.get('loading').destroy();
});