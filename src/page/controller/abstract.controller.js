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
			
			this.name = null;
			this.$viewport = null;
            
			this.$loading = null;
            this.loadingTimeoutTimer = null;
            this.showLoadingTimer = null;
            this.hideLoadingTimer = null;
		},

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

			this.showLoading();
			this.name = this.pageUrl = url;			
					
			this.$el.attr('page-url',this.pageUrl).hide();
			this.$el.appendTo(this.$viewport);

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
                
			    this.hideLoading();
				
				this.onRender && this.onRender();
				
				this._bindEvents();
			}, this);
			
			if (this.model && this.model.url) {

				var error = $.proxy(function(err) {
					this.loadModelFailed.call(this, err);
				}, this);
				
				this.model.execute(complete, error, false, this);

			} else {
				complete(this.model);
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
			this.$el.show();
			this.onShow && this.onShow();
		},

		destroy : function() {
			this._offEvents();
			this.$el.remove();
			this.onDestroy && this.onDestroy();
		},
        
        _clearLoadingTimer: function(){
            // 如果已经触发显示，同样清除timer，保证loading的最后一次执行loading和隐藏之间最大时间为20秒
            if(this.loadingTimeoutTimer){
                clearTimeout(this.loadingTimeoutTimer);
                this.loadingTimeoutTimer = null;
            }
        },
        
        _clearHideLoadingTimer: function(){
            
            if(this.hideLoadingTimer){
                clearTimeout(this.hideLoadingTimer);
                this.hideLoadingTimer = null;
            }
        },
        
        _clearShowLoadingTimer: function(){
            
            if(this.showLoadingTimer){
                clearTimeout(this.showLoadingTimer);
                this.showLoadingTimer = null;
            }
        },

		showLoading : function() {
            var self = this;
            
            // 如果已经触发隐藏，就取消隐藏触发，重新显示进度条
            this._clearHideLoadingTimer();
            
            this._clearLoadingTimer();
            
			if (this.$loading && !this.showLoadingTimer) {
                
                this.showLoadingTimer = setTimeout(function(){
                    self.$loading.show();
                    self._clearShowLoadingTimer();
                }, 200);
                
                // 限制loading只能持续显示20秒，20秒没隐藏可能是代码报错了
                this.loadingTimeoutTimer = setTimeout(function(){
                    self.$loading.hide();
                    self._clearLoadingTimer();
                }, 20000);
			}
		},

		hideLoading : function() {
            var self = this;
            
            this._clearLoadingTimer();
            
			if (this.$loading && !this.hideLoadingTimer) {
                
                self._clearShowLoadingTimer();
                
                this.hideLoadingTimer = setTimeout(function(){
                    self.$loading.hide();
                    self._clearHideLoadingTimer();
                }, 200);
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
