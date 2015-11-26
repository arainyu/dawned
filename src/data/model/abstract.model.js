/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'CoreAjax', 'UtilsPath'], function(CoreInherit, CoreAjax, UtilsPath) {
	var AbstractModel = CoreInherit.Class({
		__constructor__ : function() {

			this.url = null;
			this.domain = null;
			this.param = null;
			this.dataformat = null;
			this.validates = [];
			this.protocol = (window.location.protocol.indexOf("https") > -1) ? "https" : "http";
			this.contentType = AbstractModel.CONTENT_TYPE_JSON;
			this.method = 'GET';
			this.timeout = 30000;
			this.ajax = null;
			this.isAbort = false;

		},

		initialize : function(options) {
			for (var key in options) {
				this[key] = options[key];
			}
		},

		buildurl : function() {
			var url = this.url;
			if (UtilsPath.isUrl(url)) {
				return url;
			} else {
				var domain = this.domain ? this.domain : UtilsPath.parseUrl(window.location.href).domain;

				return domain + url;
			}
		},

		setAttr : function(key, val) {
			this[key] = val;
		},

		pushValidates : function(handler) {
			if ( typeof handler === 'function') {
				this.validates.push($.proxy(handler, this));
			}
		},

		setParam : function(key, val) {
			if ( typeof key === 'object' && !val) {
				this.param = key;
			} else {
				this.param[key] = val;
			}
		},

		getParam : function(key) {
		    if(typeof key === 'string'){
		        return this.param[key];
		    }
			return this.param;
		},

		getResult : function() {
			return this.result;
		},

		_validate : function(data) {
			var validate = true;
			if (this.validates && this.validates.length > 0) {
				for (var i = 0, len = this.validates.length; i < len; i++) {
					var validates = this.validates[i](data);

					if ( typeof validates === 'boolean' && !validates) {
						validate = false;
						break;
					}

				}
			}
			return validate;
		},

		_excuteSuccess : function(originalData, onSuccess, onError, scope) {

			if (!this._validate(originalData)) {
				if ( typeof onError === 'function') {
					return onError.call(scope || this, originalData);
				} else {
					return false;
				}
			}

			var datamodel = typeof this.dataformat === 'function' ? this.dataformat(originalData) : originalData;

			if ( typeof onSuccess === 'function') {
				onSuccess.call(scope || this, datamodel, originalData);
			}

		},

		_excuteComplete : function(xhr, onComplete, scope) {
			if ( typeof onComplete === 'function') {
				onComplete.call(scope || this, xhr);
			}
		},

		_excuteError : function(onError, onAbort, scope, e) {
			if (this.isAbort) {
				this.isAbort = false;

				if ( typeof onAbort === 'function') {
					return onAbort.call(scope || this, e);
				} else {
					return false;
				}
			}

			if ( typeof onError === 'function') {
				onError.call(scope || this, e);
			}
		},

		excute : function(onSuccess, onError, onComplete, scope, onAbort, params) {
			var params = params || $.extend({}, this.getParam());
			var url = this.buildurl();

			params.contentType = this.contentType;
			this.isAbort = false;

			var _onComplte = $.proxy(function(xhr) {
				this._excuteComplete(xhr, onComplete, scope);
			}, this);

			var _onError = $.proxy(function(e) {
				this._excuteError(onError, onAbort, scope, e);
			}, this);

			var _onSuccess = $.proxy(function(data) {
				this._excuteSuccess(data, onSuccess, _onError, scope);
			}, this);

			if (this.contentType === AbstractModel.CONTENT_TYPE_JSON) {
				return this.ajax = CoreAjax.cros(url, this.method, params, _onSuccess, _onError, _onComplte, this.timeout);
			} else if (this.contentType === AbstractModel.CONTENT_TYPE_JSONP) {
				return this.ajax = CoreAjax.jsonp(url, params, _onSuccess, _onError, _onComplte, this.timeout);
			} else {
				return this.ajax = CoreAjax.post(url, params, _onSuccess, _onError, _onComplte, this.timeout);
			}
		},

		abort : function() {
			this.isAbort = true;
			this.ajax && this.ajax.abort && this.ajax.abort();
		}
	});

	AbstractModel.getInstance = function() {
		if (this.instance instanceof this) {
			return this.instance;
		} else {
			return this.instance = new this;
		}
	};

	AbstractModel.CONTENT_TYPE_JSON = 'json';
	AbstractModel.CONTENT_TYPE_JSONP = 'jsonp';

	return AbstractModel;
});
