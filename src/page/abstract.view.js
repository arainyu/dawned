/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'UtilsParser', 'Handlebars'], function(CoreInherit, UtilsParser, Handlebars) {
	var View = CoreInherit.Class({
		
		__constructor__: function(){
			this.pageUrl = '';
			this.id = '';
			this.$el = $('<div id="'+UtilsParser.getViewId()+'" />');
			this.els = {};
			this.tplHtml = null;
			this.onBeforeCreate = null;
			this.onRender = null;
			this.onCreate = null;
			this.onHide = null;
			this.onShow = null;
			this.onDestroy = null;
		},
		
		create: function($viewport){
			this.onBeforeCreate && this.onBeforeCreate();
			
			this.$el.attr('page-url',this.pageUrl);
			
			this.hide();
			this.$el.appendTo($viewport);
			
			this.onCreate && this.onCreate();
		},
		
		render: function(model){
			if(model && this.tplHtml){
				var tpl = Handlebars.compile(this.tplHtml);
				this.$el.html(tpl(model));
			}
			
			this.onRender && this.onRender();
			
		},
		
		loadModelFailed: function(){
			this.$el.html('请求失败');
		},
		
		hide: function(){
			this.$el.hide();
			this.onHide && this.onHide();
		},
		
		show: function(){
			this.$el.show();
			this.onHide && this.onHide();
		},
		
		destroy: function(){
			this.$el.remove();
			this.onDestroy && this.onDestroy();
		}
	});
	
	return View;
});
