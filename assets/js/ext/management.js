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
			url: 'management/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupStatus = Ext.create('Ext.data.Store', {
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
			url: 'management/select'
		}
	});

	// COMPONENTS
	var txtNomor = {
		id: 'txtNomor',
		name: 'txtNomor',
		xtype: 'textfield',
		hidden: true
	};

	var txtNama = {
		anchor: '98%',
		fieldLabel: 'Nama Project',
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelAlign: 'top',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var cboStatus = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'Status',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status',
		fieldStyle: 'text-transform: uppercase;',
		labelAlign: 'top',
		id: 'cboStatus',
		name: 'cboStatus',
		store: grupStatus,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtRemark = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		height : 50,
		fieldLabel: 'Remark',
		fieldStyle: 'text-transform: uppercase;',
		labelAlign: 'top',
		id: 'txtRemark',
		name: 'txtRemark',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAssign = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Assign To',
		emptyText: 'HURUF KAPITAL',
		fieldStyle: 'text-transform: uppercase;',
		labelAlign: 'top',
		id: 'txtAssign',
		name: 'txtAssign',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

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
			flex: 1	
		},{
			width: 120,
			align: 'center',
			renderer: function(val, meta, rec) {
				var id = Ext.id();
				Ext.defer(function() {
					Ext.widget('button', {
						renderTo: id,
						text: 'ACTION',
						scale: 'small',
						handler: function() {
							var xnomor = rec.get('fs_nomor');

							// CALLBACK
							fnShowDetail(xnomor);

							Ext.getCmp('txtNomor').setValue(xnomor);
							Ext.getCmp('cboStatus').setValue(rec.get('fs_kode_status'));
							Ext.getCmp('txtNama').setValue(rec.get('fs_nama_project'));
							Ext.getCmp('txtRemark').setValue(rec.get('fs_remark'));
							Ext.getCmp('txtAssign').setValue(rec.get('fs_assign_to'));
						}
					});
				}, 50);
				return Ext.String.format('<div id="{0}"></div>', id);
			}
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
		},{
			text: 'Assign To',
			dataIndex: 'fs_assign_to',
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
				id: 'txtCari1',
				name: 'txtCari1',
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
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// FUNCTIONS
	function fnShowDetail(xnomor) {

		var winForm = Ext.create('Ext.form.Panel', {
			bodyStyle: 'background-color: '.concat(gBasePanel),
			border: false,
			defaultType: 'textfield',
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 120,
				msgTarget: 'side',
			},
			frame: false,
			id: 'frmDetail',
			method: 'POST',
			region: 'center',
			items: [{
				anchor: '100%',
				style: 'padding: 5px;',
				title: '',
				xtype: 'fieldset',
				items: [
					txtNama,
					cboStatus,
					txtRemark,
					txtAssign
				]
			}],
			buttons: [{
				iconCls: 'icon-save',
				id: 'btnSave',
				name: 'btnSave',
				text: 'Save',
				scale: 'medium',
				handler: fnCekSave
			},{
				iconCls: 'icon-reset',
				text: 'Reset',
				scale: 'medium',
				handler: fnReset
			}]
		});
		
		var winPopUp = Ext.create('Ext.window.Window', {
			height: 350,
			width: 450,
			border: false,
			closable: true,
			draggable: true,
			frame: false,
			layout: 'fit',
			plain: true,
			resizable: false,
			title: 'Nomor ' + xnomor,
			xtype: 'form',
			items: [
				winForm	
			],
			listeners: {
				beforehide: function() {
					vMask.hide();
				},
				beforeshow: function() {
					vMask.show();
				}
			}
		});

		winPopUp.show();
		winPopUp.center();
	}

	function fnReset() {
		Ext.getCmp('txtNomor').setValue('');
		Ext.getCmp('cboStatus').setValue('');
		Ext.getCmp('txtAssign').setValue('');
		Ext.getCmp('txtRemark').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'management/ceksave',
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
			url: 'management/save',
			params: {
				'fs_nomor': Ext.getCmp('txtNomor').getValue(),
				'fs_kode_status': Ext.getCmp('cboStatus').getValue(),
				'fs_remark': Ext.getCmp('txtRemark').getValue(),
				'fs_assign_to': Ext.getCmp('txtAssign').getValue()
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

	var frmManagement = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Management Project',
		width: 930,
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
					txtNomor,
					gridRequest
				]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmManagement
	});

	function fnMaskShow() {
		frmManagement.mask('Please wait...');
	}

	function fnMaskHide() {
		frmManagement.unmask();
	}
	
	frmManagement.render(Ext.getBody());
	Ext.get('loading').destroy();
});