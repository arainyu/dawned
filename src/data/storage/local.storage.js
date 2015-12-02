/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */

define(['CoreInherit', 'UtilsDate', 'AbstractStorage'], function (CoreInherit, UtilsDate, AbstractStorage) {
	var Storage = new CoreInherit.Class(AbstractStorage, {
		__constructor__: function () {
		},
		
		/**
		 * @description 复写自顶层Class的initialize，赋值队列
		 * @param {Object} $super
		 * @param {Object} options
		 */
		initialize: function ($super, options) {
			this.proxy = window.localStorage;

			$super(options);
		},

		originalGet: function (key) {
			var value = localStorage.getItem(key);
			var data = value ? JSON.parse(value) : null;
			var now, timeout;

			if (data && data.timeout) {
				
				/*验证是否过期*/
				now = new Date();
				timeout = UtilsDate.parse(data.timeout).valueOf();

				if (timeout - UtilsDate.parse(UtilsDate.format(now, 'Y-m-d')).valueOf() >= 0) {
					return data;
				}

				localStorage.removeItem(key);
				return null;
			}
			return data;
		},

		originalSet: function (key, value) {
			window.localStorage.setItem(key, value);
		},

		originalRemove: function (key) {
			window.localStorage.removeItem(key);
		}

	});

	Storage.getInstance = function () {
		if (this.instance) {
			return this.instance;
		} else {
			return this.instance = new this();
		}
	};

	Storage.localStorage = Storage.getInstance();

	return Storage;
});