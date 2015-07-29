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
			this.id = UtilsParser.getViewId();
			this.$el = $('<div id="'+this.id+'" />');
			this.els = {};
			this.tplHtml = null;
		},
		
		onBeforeCreate:null,
		onCreate: null,
		onRender: null,
		onHide: null,
		onShow: null,
		onDestroy: null,
		
		events: {},
		
		create: function($viewport){
			this.onBeforeCreate && this.onBeforeCreate();
			
			this.$el.attr('page-url',this.pageUrl).hide();
			this.$el.appendTo($viewport);
			
			this.onCreate && this.onCreate();
		},
		
		template: function(tpl, data){
			var _tpl = Handlebars.compile(tpl);
			return _tpl(data);
		},
		
		render: function(model){
			if(model && this.tplHtml){
				this.$el.html(this.template(this.tplHtml, model));
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
			this.onShow && this.onShow();
		},
		
		destroy: function(){
			this.$el.remove();
			this.onDestroy && this.onDestroy();
		}
	});
	
	return View;
});
