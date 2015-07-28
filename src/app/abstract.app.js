/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreObserver', 'UtilsPath'], function(Observer, Path) {
	var App = function(options) {
		this.initialize(options);
	};

	App.statusEvents = {
		VIEW_READY : 'viewready',
		SWITCH_CHANGE : 'switchchange'
	};

	App.prototype.initialize = function() {
		this.bindEvent();
	};

	App.prototype.viewReady = function(handle) {
		Observer.subscribe(App.VIEW_READY, handle);
	};

	App.prototype.bindEvent = function(handle) {
		this._hideHyperlink();
		
		$(window).bind('hashchange', _.bind(function(e) {
			alert('d');
		}, this));
	};

	App.prototype._hideHyperlink = function() {
		$('body').on('click', function(e) {
			var el = $(e.target);
			var needhandle = false;

			while (true) {
				if (!el[0])
					break;
				if (el[0].nodeName == 'BODY')
					break;
				if (el.hasClass('sub-viewport'))
					break;

				if (el[0].nodeName == 'A') {
					needhandle = true;
					break;
				}
				el = el.parent();
			}

			if (needhandle) {
				var href = el.attr('href');

				if (href.indexOf('#') > -1) {
					e.preventDefault();
				}
			}
		});
	};

	App.prototype.start = function() {

	};

	App.prototype.loadView = function(controllerStr) {

		require(['webresources/controllers/' + controllerStr], function(controller) {
			controller.onCreate();
		});
	};

	App.prototype.switchView = function(inView, outView) {
		
	};

	App.prototype.goTo = function(hash) {
		var controller = hash;

		if (!hash || hash == '' || hash == '#' || hash == '#!') {
			controller = '#!index';
		}

		if (controller.indexOf('#!') > -1) {
			controller = controller.replace('#!', '');
		}

		window.location.hash = '!' + controller;

		this.loadView(controller);
	};

	App.prototype.goBack = function() {
	};

	App.prototype.forward = function() {
	};

	App.prototype.back = function() {
	};

	App.prototype.go = function() {
	};

	App.prototype.jump = function() {
	};

	App.prototype.interface = function() {
		var self = this;

		return {
			viewReady : self.viewReady,
			goTo : self.goTo,
			goBack : self.goBack,
			forward : self.forward,
			back : self.back,
			go : self.go,
			jump : self.jump
		};
	};

	return App;
});
