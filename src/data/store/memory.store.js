/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */

define(['CoreInherit', 'MemoryStorage', 'AbstractStore'], function (CoreInherit, MemoryStorage, AbstractStore) {
	
	var _MemoryStore = new CoreInherit.Class(AbstractStore, {
		
		__constructor__: function () {
			
			// 本地存储对象
			this.storeProxy = MemoryStorage.getInstance();
		},
		
		/**
		 * @description 复写自顶层Class的initialize，赋值队列
		 * @param $super
		 * @param options
		 */
		initialize: function ($super, options) {
			$super(options);
		}
	});

	return _MemoryStore;
});