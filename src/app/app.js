/**
 * @copyright http://www.wingontravel.com
 * @author zx.yu(zx.yu@ctrip.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'AbstractApp'], function(CoreInherit, AbstractApp) {
	var App = CoreInherit.Class(AbstractApp, {
		start: function(){
			this.loadView(location.href);
		}
	});
	
	return App;
});
