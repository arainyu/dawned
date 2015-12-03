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
		onBeforeRender : null,
		onRender : null,
		onHide : null,
		onShow : null,
		onDestroy : null,
		
		events: {},

		initialize : function($viewport) {
			if (!this.view || !(this.view instanceof PageAbstractView)) {
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
			this.onBeforeRender && this.onBeforeRender();
			
			var complete = $.proxy(function(data) {
				var html = this.tpl || '';
				
				if(data){
					html = this.view.template(this.tpl, data);
				}
				
				this.$el.html(html);
				
				this.onRender && this.onRender();
				
				this._bindEvents();
			}, this);
			
			if (this.model && this.model.url) {

				var error = $.proxy(function(err) {
					this.loadModelFailed(err);
				}, this);
				
				this.model.execute(complete, error, false, this);

			} else {
				complete();
			}
		},
		
		reRender: function(){
			this._offEvents();
			this.$el.empty();
			this.render();
		},
		
		loadModelFailed: function(){
			this.$el.html('请求失败');
		},
		
		_eventList: [],
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
				
				self._eventList.push({
					target: targetSelector,
					eventName: eventName
				});
				
				self.$el.find(targetSelector)
				    .on(eventName, $.proxy(self[functionName], self));
			});
		},
		
		_offEvents: function(){
			var self = this;
			
			$.each(self._eventList, function(key, value){
				self.$el.find(value.target)
				    .off(value.eventName);
			});
		},

		hide : function() {
			this.$el.hide();
			this.onHide && this.onHide();
		},

		show : function() {
			this.hideLoading();
			this.$el.show();
			this.onShow && this.onShow();
		},

		destroy : function() {
			this._offEvents();
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
