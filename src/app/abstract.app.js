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

	App.defaults = {
		$main : $('#main'),
		$viewport : $('.main-viewport')
	}, App.statusEvents = {
		VIEW_READY : 'viewready'
	};

	App.prototype.initialize = function() {
		this.bindEvent();

		this.curController = null;
		this.controllers = {};
	};

	App.prototype.viewReady = function(handle) {
		Observer.subscribe(App.VIEW_READY, handle);
	};

	App.prototype.bindEvent = function() {
		//var self = this;
		
		this._hideHyperlink();
		
		/*
		$(window).on('hashchange', $.proxy(function(e) {
			var controllerName = Path.getControllerNameByHash(window.location.hash);

			if (!self.curController || controllerName !== self.curController.name) {
				self.loadView(controllerName);
			}
		}, this));
		*/

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

	App.prototype.loadView = function(controllerName) {
		var self = this;
		var controller = self.controllers[controllerName];

		if (controller) {
			this.switchView(controller, this.curController);
		} else {
			var ext = Dawned.controllersPath.indexOf('/') === 0 ? '.js' : '';
			var controllerPath = Dawned.controllersPath + controllerName + ext;
			require([controllerPath], function(Controller) {
				controller = new Controller(App.defaults.$viewport);
				controller.create(controllerName);

				self.switchView(controller, self.curController);

				self.controllers[controllerName] = self.curController;

			});
		}

	};

	App.prototype.switchView = function(inController, outController) {
		outController && outController.hide();
		inController.show();

		this.curController = inController;
		
		Observer.publish(App.VIEW_READY);
	};

	App.prototype.goTo = function(controllerName) {
		if (!controllerName) {
			controllerName = 'index';
		}

		window.location.hash = Path.creatHashByControllerName(controllerName);

		this.loadView(controllerName);
	};

	App.prototype.goBack = function(controllerName) {
		if (!controllerName) {
			history.back();
			return;
		}

		this.goTo(controllerName);
	};

	App.prototype.forward = function(controllerName) {
		this.goTo(controllerName);
	};

	App.prototype.back = function(controllerName) {
		this.goBack(controllerName);
	};

	App.prototype.go = function(controllerName) {
		this.goTo(controllerName);
	};

	App.prototype.jump = function(url) {
		var openUrl = url;
		if (!Path.isUrl(url)) {
			var domain = window.location.protocol + '//' + window.location.host;
			openUrl = domain + url;
		}

		window.location.href = openUrl;
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
