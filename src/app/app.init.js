/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['App'], function(App) {

	var app = new App({}), interfaces = app.interface();

	Dawned.instance = app;

	for (var key in interfaces) {
		Dawned[key] = $.proxy(interfaces[key], app);
	}
	
	//TODO 这里需要注意了
	Dawned.readyQueue && _.each(Dawned.readyQueue, function(fn) {
		Dawned.viewReady(fn);
	});
	
	delete Dawned.readyQueue;

	return app;
});
