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

	var vLevel = '';
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	Ext.define('DataGridUser', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_username', type: 'string'},
			{name: 'fs_level_user', type: 'string'},
			{name: 'fd_last_login', type: 'string'},
			{name: 'fs_ip_address', type: 'string'}
		]
	});

	Ext.define('DataGridMenu', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nm_menu', type: 'string'},
			{name: 'fs_kd_induk', type: 'string'},
			{name: 'fs_kd_menu', type: 'string'},
			{name: 'fb_tambah', type: 'bool'}
		]
	});

	Ext.define('DataGridActivity', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'ft_log_time', type: 'string'},
			{name: 'fs_log_name', type: 'string'},
			{name: 'fd_log_user', type: 'string'},
			{name: 'fs_log_message', type: 'string'},
			{name: 'fs_ip_address', type: 'string'}
		]
	});

	// STORES
	var grupUser = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridUser',
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
			url: 'masteruser/griduser'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var grupMenu = Ext.create('Ext.data.TreeStore', {
		autoLoad: true,
		model: 'DataGridMenu',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'masteruser/ambilnodes'
		},
		rootProperty: {
			expanded: true
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_level': vLevel	
				});
			}
		}
	});

	var grupLevel = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kd_parent', 'fs_kd_child',
			'fs_level', 'fs_index'
		],
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
			url: 'masteruser/gridlevel'
		}
	});

	var grupActivity = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridActivity',
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
			url: 'masteruser/gridactivity'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari3').getValue()
				});
			}
		}
	});


	// POPUP SETUP LEVEL
	var winGrid2 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLevel,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Nama Level", dataIndex: 'fs_level', menuDisabled: true, flex: 1}
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupLevel,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboLevel2').setValue(record.get('fs_level'));
				vLevel = record.get('fs_level').trim();
				grupMenu.load();
				winCari2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupLevel.load();
				vMask.show();
			}
		}
	});

	// GRIDS
	var gridUser = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupUser,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Username',
			dataIndex: 'fs_username',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Level User',
			dataIndex: 'fs_level_user',
			menuDisabled: true,
			flex: 1
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupUser
		}),
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama User',
				id: 'txtCari2',
				name: 'txtCari2',
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
					grupUser.load();
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
				Ext.getCmp('txtUser').setValue(record.get('fs_username'));
				Ext.getCmp('cboLevel1').setValue(record.get('fs_level_user'));
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

	var gridMenu = Ext.create('Ext.tree.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		rootVisible: false,
		sortableColumns: false,
		store: grupMenu,
		columns: [{
			dataIndex: 'fs_nm_menu',
			flex: 1.5,
			menuDisabled: true,
			text: 'Menu',
			xtype: 'treecolumn'
		},{
			dataIndex: 'fs_kd_child',
			hidden: true,
			menuDisabled: true,
			text: 'Kode'
		},{
			align: 'center',
			dataIndex: 'fb_tambah',
			flex: 0.25,
			menuDisabled: true,
			stopSelection: false,
			text: 'Add',
			xtype: 'checkcolumn',
			listeners: {
				checkchange: function(grid, rowIndex, checked) {
					var store = gridMenu.getStore();
					var record = store.getAt(rowIndex);
					var total = grupMenu.getCount();

					var kode = record.get('fs_kd_menu').trim();
					var cek = record.get('fb_tambah');
					var len = 0;
					len = kode.length;
					var j = 0;
					var ada = false;

					if (cek === true) {
						if (len === 0) {
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								if (len === 0 && i !== rowIndex) {
									break;
								} else {
									record.set('fb_tambah','1');
								}
							}
						} else if (len === 4) {
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								if ((len === 0) || (len === 4 && i !== rowIndex)) {
									break;
								} else {
									record.set('fb_tambah','1');
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								if (len === 0) {
									record.set('fb_tambah','1');
									break;
								}
							}
						} else if (len === 6) {
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4) || (len === 6 && i !== rowIndex)) {
									break;
								} else {
									record.set('fb_tambah','1');
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 4) {
									record.set('fb_tambah','1');
									break;
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									record.set('fb_tambah','1');
									break;
								}
							}
						} else if (len === 8) {
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4) || (len === 6) || (len === 8 && i !== rowIndex)) {
									break;
								} else {
									record.set('fb_tambah','1');
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 6) {
									record.set('fb_tambah','1');
									break;
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 4) {
									record.set('fb_tambah','1');
									break;
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									record.set('fb_tambah','1');
									break;
								}
							}
						} else if (len === 10) {
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4) || (len === 6) || (len === 8) || (len === 10 && i !== rowIndex)) {
									break;
								} else {
									record.set('fb_tambah','1');
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 8) {
									record.set('fb_tambah','1');
									break;
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 6) {
									record.set('fb_tambah','1');
									break;
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 4) {
									record.set('fb_tambah','1');
									break;
								}
							}

							for (i = rowIndex; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									record.set('fb_tambah','1');
									break;
								}
							}
						}
					}
					else {
						// UNCHECK
						if (len === 0) {
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 && i !== rowIndex) {
									break;
								} else {
									record.set('fb_tambah','0');
								}
							}
						} else if (len === 4) {
							// UNCHECK 4
							j = 0;
							ada = false;

							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4 && i !== rowIndex)) {
									break;
								} else if (len === 6 || len === 8) {
									record.set('fb_tambah','0');
								}
							}

							// UNCHECK 2
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								cek = record.get('fb_tambah');
								if (len === 0) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 4 && cek === true) {
										ada = true;
									}
								}
							}
						} else if (len === 6) {
							// UNCHECK 6
							j = 0;
							ada = false;

							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4) || (len === 6 && i !== rowIndex)) {
									break;
								} else if (len === 8) {
									record.set('fb_tambah','0');
								}
							}

							// UNCHECK 4
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 || len === 4) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 4) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 6 && cek === true) {
										ada = true;
									}
								}
							}

							// UNCHECK 2
							j = 0;
							ada = false;

							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 0) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 4 && cek === true) {
										ada = true;
									}
								}
							}
						} else if (len === 8) {
							// UNCHECK 8
							j = 0;
							ada = false;
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4) || (len === 6) || (len === 8 && i !== rowIndex)) {
									break;
								} else if (len === 10) {
									record.set('fb_tambah','0');
								}
							}

							// UNCHECK 6
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 || len === 4 || len === 6) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 6) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 8 && cek === true) {
										ada = true;
									}
								}
							}

							// UNCHECK 4
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 || len === 4) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 4) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 6 && cek === true) {
										ada = true;
									}
								}
							}

							// UNCHECK 2
							j = 0;
							ada = false;
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 0) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 4 && cek === true) {
										ada = true;
									}
								}
							}
						} else if (len === 10) {
							// UNCHECK 10
							j = 0;
							ada = false;

							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if ((len === 0) || (len === 4) || (len === 6) || (len === 8) || (len === 10 && i !== rowIndex)) {
									break;
								} else if (len === 12) {
									record.set('fb_tambah','0');
								}
							}

							// UNCHECK 8
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 || len === 4 || len === 6 || len === 8) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 8) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 10 && cek === true) {
										ada = true;
									}
								}
							}

							// UNCHECK 6
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 || len === 4 || len === 6) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 6) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 8 && cek === true) {
										ada = true;
									}
								}
							}

							// UNCHECK 4
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0 || len === 4) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 4) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 6 && cek === true) {
										ada = true;
									}
								}
							}

							// UNCHECK 2
							j = 0;
							ada = false;
							for (i = rowIndex; i < total; i++) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;

								if (len === 0) {
									j = i - 1;
									break;
								} else if (i === total - 1) {
									j = i;
									break;
								}
							}

							ada = false;
							for (i = j; i >= 0; i--) {
								record = store.getAt(i);
								kode = record.get('fs_kd_menu').trim();
								len = kode.length;
								cek = record.get('fb_tambah');

								if (len === 0) {
									if (ada === false) {
										record.set('fb_tambah','0');
									}
									break;
								} else {
									if (len === 4 && cek === true) {
										ada = true;
									}
								}
							}
						}
					}
				}
			}
		}],
		tbar: [{
			flex: 2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				afterLabelTextTpl: required,
				allowBlank: false,
				anchor: '95%',
				fieldStyle: 'text-transform: uppercase;',
				editable: true,
				fieldLabel: 'Nama Level',
				id: 'cboLevel2',
				name: 'cboLevel2',
				xtype: 'textfield',
				labelAlign: 'top',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				},
				triggers: {
					reset: {
						cls: 'x-form-clear-trigger',
						handler: function(field) {
							field.setValue('');
						}
					},
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							winCari2.show();
							winCari2.center();
						}
					}
				}
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var gridActivity = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupActivity,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Waktu Log',
			dataIndex: 'ft_log_time',
			menuDisabled: true,
			flex: 1.3
		},{
			text: 'Nama Log',
			dataIndex: 'fs_log_name',
			menuDisabled: true,
			flex: 1.7
		},{
			text: 'Nama User',
			dataIndex: 'fs_log_user',
			menuDisabled: true,
			flex: 1.3
		},{
			text: 'Aktifitas',
			dataIndex: 'fs_log_message',
			menuDisabled: true,
			flex: 3.5
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupActivity
		}),
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama User',
				id: 'txtCari3',
				name: 'txtCari3',
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
					grupActivity.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT TAB SETUP USER
	var cboLevel1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'Level User',
		displayField: 'fs_level',
		editable: false,
		fieldLabel: 'Level User',
		id: 'cboLevel1',
		name: 'cboLevel1',
		store: grupLevel,
		valueField: 'fs_level',
		xtype: 'combobox'
	};

	var txtUser = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		fieldLabel: 'Username',
		emptyText: 'HURUF KAPITAL',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtUser',
		name: 'txtUser',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtPass = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'HURUF KAPITAL',
		fieldLabel: 'Password',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtPass',
		name: 'txtPass',
		inputType: 'password',
		value: '',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtConf = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		emptyText: 'HURUF KAPITAL',
		fieldLabel: 'Confirm Password',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtConf',
		name: 'txtConf',
		inputType: 'password',
		value: '',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSave1 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave1',
		name: 'btnSave1',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveUser
	};

	var btnReset1 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset1',
		name: 'btnReset1',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetUser
	};

	// COMPONENT TAB SETUP LEVEL
	var btnSave2 = {
		anchor: '95%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave2',
		name: 'btnSave2',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveLevel
	};

	var btnReset2 = {
		anchor: '95%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset2',
		name: 'btnReset2',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetLevel
	};


	// FUNCTION TAB USER
	function fnResetUser() {
		Ext.getCmp('cboLevel1').setValue('');
		Ext.getCmp('txtUser').setValue('');
		Ext.getCmp('txtPass').setValue('');
		Ext.getCmp('txtConf').setValue('');
	}

	function fnCekSaveUser() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/ceksaveuser',
				params: {
					'fs_username': Ext.getCmp('txtUser').getValue(),
					'fs_password': Ext.getCmp('txtPass').getValue(),
					'fs_confpass': Ext.getCmp('txtConf').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'DENTIST'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'DENTIST',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveUser();
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
						title: 'DENTIST'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveUser() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/saveuser',
			params: {
				'fs_username': Ext.getCmp('txtUser').getValue(),
				'fs_password': Ext.getCmp('txtPass').getValue(),
				'fs_level_user': Ext.getCmp('cboLevel1').getValue()
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
				fnResetUser();

				// REFRESH AFTER SAVE
				grupUser.load();
				grupActivity.load();
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

	// FUNCTION TAB LEVEL
	function fnResetLevel() {
		Ext.getCmp('cboLevel2').setValue('');
		vLevel = '';
		grupMenu.load();
	}

	function fnCekSaveLevel() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masteruser/ceksavelevel',
				params: {
					'fs_level': Ext.getCmp('cboLevel2').getValue()
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
									fnSaveLevel();
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

	function fnSaveLevel() {
		var xkdinduk = '';
		var xkdmenu = '';
		var store = gridMenu.getStore();

		store.each(function(record, idx) {
			if (record.get('fb_tambah') === true) {
				xkdinduk = xkdinduk +'|'+ record.get('fs_kd_induk');
				xkdmenu = xkdmenu +'|'+ record.get('fs_kd_menu');
			}
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masteruser/savelevel',
			params: {
				'fs_level': Ext.getCmp('cboLevel2').getValue(),
				'fs_kd_induk': xkdinduk,
				'fs_kd_menu': xkdmenu
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
				fnResetLevel();
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
	
	var frmMasterUser = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'User & Hak Aksesnya',
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
				title: 'Setup User',
				xtype: 'form',
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
								title: 'Form Setup User',
								xtype: 'fieldset',
								items: [
									cboLevel1,
									txtUser,
									txtPass,
									txtConf
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
										btnSave1
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset1
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data User',
								xtype: 'fieldset',
								items: [
									gridUser
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Level',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
						msgTarget: 'side'
					},
					anchor: '60%',
					style: 'padding: 5px;',
					title: 'Setup Level',
					xtype: 'fieldset',
					items: [
						gridMenu
					]
				},{
					anchor: '60%',
					style: 'padding: 5px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 4,
							layout: 'anchor',
							xtype: 'container',
							items: []
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [
								btnSave2
							]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [
								btnReset2
							]
						}]
					}]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'User Activity',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
						msgTarget: 'side'
					},
					anchor: '98%',
					style: 'padding: 5px;',
					title: 'User Activity',
					xtype: 'fieldset',
					items: [
						gridActivity
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterUser
	});

	function fnMaskShow() {
		frmMasterUser.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterUser.unmask();
	}
	
	frmMasterUser.render(Ext.getBody());
	Ext.get('loading').destroy();
});