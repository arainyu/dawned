/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'UtilsParser', 'PageAbstractView'], function(CoreInherit, UtilsParser, PageAbstractView) {
	var Controller = CoreInherit.Class({

		__constructor__ : function() {
			this.view = null;
			this.model = null;
			
			this.pageUrl = '';
			this.id = UtilsParser.getViewId();
			this.$el = $('<div id="'+this.id+'" />');
			this.tpl = null;
			
			this.$viewport = null;
			this.$loading = null;
			this.name = null;
		},

		onBeforeCreate : null,
		onCreate : null,
		onRender : null,
		onHide : null,
		onShow : null,
		onDestroy : null,
		
		events: {},

		initialize : function($viewport) {
			if (!this.view || !this.view instanceof PageAbstractView) {
				throw '模版引擎不存在';
			}
			this.setViewport($viewport);
		},

		setViewport : function($viewport) {
			if ($viewport) {
				this.$viewport = $viewport;
			} else if (!this.$viewport) {
				this.$viewport = $('body');
			}
		},

		create : function(url) {
			this.onBeforeCreate && this.onBeforeCreate();

			this.showLoading();
			this.name = this.pageUrl = url;			
					
			this.$el.attr('page-url',this.pageUrl).hide();
			this.$el.appendTo(this.$viewport);
			
			this.onCreate && this.onCreate();

			this.render();
		},

		render : function() {

			var complete = $.proxy(function(data) {
				this.onRender && this.onRender();
				
				if(this.tpl){
					this.$el.html(this.tpl);
				}
				
				this._bindEvents();
			}, this);
			
			if (this.model && this.model.url) {
				
				var success = $.proxy(function(data) {
					var html = this.view.templete(this.tpl, data);
					this.$el.html(html);
				}, this);

				var error = $.proxy(function(err) {
					this.loadModelFailed(err);
				}, this);

				this.model.excute(success, error, complete, this);

			} else {
				complete();
			}
		},
		
		loadModelFailed: function(){
			this.$el.html('请求失败');
		},
		
		_bindEvents: function(){
			var events = this.events,
				self = this;
			
			if(!$.isPlainObject(events)){
				return;
			}
			
			$.each(events, function(key, value){
				var firstSpaceIndex = key.indexOf(' ');
				var eventName = key.substr(0, firstSpaceIndex);
				var targetSelector = key.substr(firstSpaceIndex+1);
				var functionName = value || function(){};
				
				self.$el.find(targetSelector)
				    .on(eventName, $.proxy(self[functionName], self));
			});
		},

		hide : function() {
			this.$el.hide();
			this.onHide && this.onHide();
		},

		show : function() {
			this.hideLoading();
			this.$el.show();
			this.onShow && this.onHide();
		},

		destroy : function() {
			this.$el.remove();
			this.onDestroy && this.onDestroy();
		},

		showLoading : function() {
			if (this.$loading) {
				this.$loading.show();
			} else {
				this.$loading = $('<div>加载中...</div>');
				this.$viewport.append(this.$loading);
			}
		},

		hideLoading : function() {
			if (this.$loading) {
				this.$loading.hide();
			}
		},

		showMessage : function() {
		},

		showMask : function() {
		},
		
		goTo: function(controllerName){
			Dawned.goTo(controllerName);
		},
		goBack: function(controllerName){
			Dawned.goBack(controllerName);
		},
		jump: function(url){
			Dawned.jump(url);
		}
	});

	return Controller;
});
