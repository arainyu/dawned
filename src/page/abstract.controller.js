/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit'], function(CoreInherit) {
	var Controller = CoreInherit.Class({

		__constructor__ : function() {
			this.view = null;
			this.model = null;
			this.$viewport = null;
			this.$loading = null;
		},

		onBeforeCreate : null,
		onCreate : null,
		onRender : null,
		onHide : null,
		onShow : null,
		onDestroy : null,

		initialize : function($viewport) {
			if (!this.view) {
				throw '找不到相关view';
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
			this.view.pageUrl = url;
			this.view.create(this.$viewport);
			this.onCreate && this.onCreate();

			this.render();
		},

		render : function() {

			var complete = _.bind(function(data) {
				this.onRender && this.onRender();
				this.show();
				this.hideLoading();
			}, this);
			
			if (this.model && this.model.url) {
				var success = _.bind(function(data) {
					this.view.render(data);
				}, this);

				var error = _.bind(function() {
					this.view.loadModelFailed();
				}, this);

				this.model.excute(success, error, complete, this);

			} else {
				this.view.render();
				complete();
			}
		},

		hide : function() {
			this.view.hide();
			this.onHide && this.onHide();
		},

		show : function() {
			this.view.show();
			this.onHide && this.onHide();
		},

		destroy : function() {
			this.view.destroy();
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
		}
	});

	return Controller;
});
