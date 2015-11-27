/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */

define(['CoreInherit', 'AbstractStorage'], function (CoreInherit, AbstractStorage) {
	var MemoryStorage = {
		dataMap: {},
		setItem: function (key, val) {
			this.dataMap[key] = val
		},
		getItem: function (key) {
			return this.dataMap[key];
		},
		removeItem: function (key) {
			delete this.dataMap[key]
		},
		clear: function () {
			this.dataMap = {}
		}
	};
	
	var Storage = new CoreInherit.Class(AbstractStorage, {
		__constructor__: function () {
		},
		
		/**
		 * @param {Object} $super
		 * @param {Object} options
		 * @description 复写自顶层Class的initialize，赋值队列
		 */
		initialize: function ($super, options) {
			this.proxy = MemoryStorage;

			$super(options);
		}

	});

	Storage.getInstance = function () {
		if (this.instance) {
			return this.instance;
		} else {
			return this.instance = new this();
		}
	};

	Storage.memoryStorage = Storage.getInstance();

	return Storage;
});