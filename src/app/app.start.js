/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
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
