/**
 * @copyright http://www.wingontravel.com
 * @author zx.yu(zx.yu@ctrip.com)
 * @namespace
 * @description
 */
define(['AppInit'], function(appInit) {
	if (Dawned.pdConfig) {
		require(Dawned.pdConfig, function() {
			appInit.start();
		});
	} else {
		appInit.start();
	}
});
