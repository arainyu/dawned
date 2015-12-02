/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */

define(['CoreInherit', 'SessionStorage', 'AbstractStore'], function (CoreInherit, SessionStorage, AbstractStore) {
	
	var _SessionStore = new CoreInherit.Class(AbstractStore, {
		
		__constructor__: function () {
			
			// 本地存储对象
			this.storeProxy = SessionStorage.getInstance();
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

	return _SessionStore;
});