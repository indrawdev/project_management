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

	var frmManagement = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Management Project',
		width: 930,
		items: [{

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