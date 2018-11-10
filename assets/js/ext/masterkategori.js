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

	Ext.define('DataGridKategori', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_kategori', type: 'string'},
			{name: 'fs_nama_kategori', type: 'string'}
		]
	});

	// STORES
	var grupKategori = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKategori',
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
			url: 'masterkategori/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	// COMPONENTS
	var txtKode = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Kode',
		emptyText: 'HURUF KAPITAL',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKode',
		name: 'txtKode',
		xtype: 'textfield',
		minLength: '3',
		maxLength: '3',
		enforceMaxLength : true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Nama',
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

	var btnSave = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave',
		name: 'btnSave',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave
	};

	var btnReset = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset',
		name: 'btnReset',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset
	};

	// GRIDS
	var gridKategori = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupKategori,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode',
			dataIndex: 'fs_kode_kategori',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nama',
			dataIndex: 'fs_nama_kategori',
			menuDisabled: true,
			flex: 2
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKategori
		}),
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Kategori',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKategori.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKode').setValue(record.get('fs_kode_kategori'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_kategori'));
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

	// FUNCTIONS
	function fnReset() {
		Ext.getCmp('txtKode').setValue('');
		Ext.getCmp('txtNama').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterkategori/ceksave',
				params: {
					'fs_kode_status': Ext.getCmp('txtKode').getValue()
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
			url: 'masterkategori/save',
			params: {
				'fs_kode_kategori': Ext.getCmp('txtKode').getValue(),
				'fs_nama_kategori': Ext.getCmp('txtNama').getValue()
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

				// RESET
				fnReset();

				// REFRESH AFTER SAVE
				grupKategori.load();
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


	var frmMasterKategori = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Kategori',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 120,
				msgTarget: 'side'
			},
			xtype: 'fieldset',
			border: false,
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
						title: 'Form Kategori',
						xtype: 'fieldset',
						items: [
							txtKode,
							txtNama
						]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2.2,
							layout: 'anchor',
							xtype: 'container',
							items: []
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [
								btnSave
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [
								btnReset
							]
						}]
					}]
				},{
					flex: 1.5,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						style: 'padding: 5px;',
						title: 'Data Kategori',
						xtype: 'fieldset',
						items: [
							gridKategori
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterKategori
	});

	function fnMaskShow() {
		frmMasterKategori.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterKategori.unmask();
	}
	
	frmMasterKategori.render(Ext.getBody());
	Ext.get('loading').destroy();
});