/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit'], function(CoreInherit) {
	var Controller = CoreInherit.Class({		
		
		__constructor__: function(){
			this.view = null;
			this.model = null;
			this.$viewport = null;
			this.$loading = null;
			this.onBeforeCreate = null;
			this.onCreate = null;
			this.onHide = null;
			this.onShow = null;
			this.onDestroy = null;
			this.onRender = null;
		},
		
		initialize: function($viewport){
			if(!this.view){
				throw '找不到相关view';
			}
			this.setViewport($viewport);
		},
		
		setViewport: function($viewport){			
			if($viewport){
				this.$viewport = $viewport;
			}else if(!this.$viewport){
				this.$viewport = $('body');
			}
		},
		
		create: function(){
			this.onBeforeCreate && this.onBeforeCreate();
			
			this.showLoading();
			this.view.create(this.$viewport);
			this.onCreate && this.onCreate();
			
			this.render();
		},
		
		render: function(){
			if(this.model){
				this.model.excute(_.bind(function(data){
					this.view.render(data);
					this.show();
					this.hideLoading();
				},this), _.bind(function(){
					this.view.loadModelFailed();
					this.show();
					this.hideLoading();
				},this));
			}else{
				this.view.render();
			}
			this.onRender && this.onRender();
		},
		
		hide: function(){
			this.view.hide();
			this.onHide && this.onHide();
		},
		
		show: function(){
			this.view.show();
			this.onHide && this.onHide();
		},
		
		destroy: function(){
			this.view.destroy();
			this.onDestroy && this.onDestroy();
		},
		
		showLoading: function(){
			if(this.$loading){
				this.$loading.show();
			}else{
				this.$loading = $('<div>加载中...</div>');
				this.$viewport.append(this.$loading);
			}
		},
		
		hideLoading:function(){
			if(this.$loading){
				this.$loading.hide();
			}
		},
		
		showMessage: function(){},
		
		showMask: function(){}
	});
	
	return Controller;
});
