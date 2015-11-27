/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */

define(['CoreInherit', 'AbstractStorage'], function (CoreInherit, AbstractStorage) {
	var Storage = new CoreInherit.Class(AbstractStorage, {
		__constructor__: function () {
		},
		
		/**
		 * @param {Object} $super
		 * @param {Object} options
		 * @description 复写自顶层Class的initialize，赋值队列
		 */
		initialize: function ($super, options) {
			this.proxy = window.sessionStorage;

			$super(options);
		},

		originalGet: function (key) {
			return window.sessionStorage.getItem(key);
		},

		originalSet: function (key, value) {
			window.sessionStorage.setItem(key, value);
		},

		originalRemove: function (key) {
			window.sessionStorage.removeItem(key);
		}

	});

	Storage.getInstance = function () {
		if (this.instance) {
			return this.instance;
		} else {
			return this.instance = new this();
		}
	};

	Storage.sessionStorage = Storage.getInstance();

	return Storage;
});