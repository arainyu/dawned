/**
 * @copyright http://www.wingontravel.com
 * @author zx.yu(zx.yu@ctrip.com)
 * @namespace
 * @description
 */
define(['CoreObserver', 'UtilsPath'], function(Observer,Path) {
	var App = function(options){
		this.initialize(options);
	};
	
	App.statusEvents = {
		VIEW_READY: 'viewready',
		SWITCH_CHANGE: 'switchchange'
	};
	
	App.prototype.initialize =  function(){};
	
	App.prototype.viewReady =  function(handle){
		Observer.subscribe(App.VIEW_READY, handle);
	};
	
	App.prototype.start =  function(){
		
	};
	
	App.prototype.loadView =  function(url){
		var path = Path.parseUrl(url);
		
	};
	
	App.prototype.switchView =  function(){
		
	};
	
	App.prototype.goTo =  function(){};
	
	App.prototype.goBack =  function(){};
	
	App.prototype.forward =  function(){};
	
	App.prototype.back =  function(){};
	
	App.prototype.go =  function(){};
	
	App.prototype.jump =  function(){};
	
	return App;
});
