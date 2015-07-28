/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['App'], function(App) {
	
	var app = new App({}),
		interfaces = app.interface();
	
	Dawned.instance = app;
	
	for(var key in interfaces){
		Dawned[key] = $.proxy(interfaces[key], app);
	}
	
	return app;
});
