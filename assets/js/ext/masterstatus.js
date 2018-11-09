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

	var frmMasterStatus = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Status',
		width: 930,
		items: [{

		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterStatus
	});

	function fnMaskShow() {
		frmMasterStatus.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterStatus.unmask();
	}
	
	frmMasterStatus.render(Ext.getBody());
	Ext.get('loading').destroy();
});