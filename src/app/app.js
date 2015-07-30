/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'AbstractApp', 'UtilsPath'], function(CoreInherit, AbstractApp, Path) {
	var App = CoreInherit.Class(AbstractApp, {
		start : function() {
			var controllerName = Path.getControllerNameByUrl(location.href);
			
			this.goTo(controllerName);
		}
	});

	return App;
});
