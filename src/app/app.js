/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'AbstractApp', 'UtilsPath'], function(CoreInherit, AbstractApp, Path) {
	var App = CoreInherit.Class(AbstractApp, {
		start: function(){
			var hash = Path.parseUrl(location.href).hash;
			if(!hash){
				hash = '';
			}
			this.goTo(hash);
		}
	});
	
	return App;
});
