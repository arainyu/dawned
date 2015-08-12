/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace CoreObserver
 * @description 消息观察者（订阅）
 */
define([], function() {

	var queue = {};
	var observer = {
		/**
		 * 发布消息
		 * @method Common.cMessageCenter.publish
		 * @param {string} eventName 消息标示
		 * @param {array} args 参数
		 */
		publish : function(eventName, args) {
			if (queue[eventName]) {
				$.each(queue[eventName], function(index, item) {
					item.handler.apply(item.scope ? item.scope : window, args);
				});
			}
		},

		/**
		 * 订阅消息
		 * @method Common.cMessageCenter.subscribe
		 * @param {string} eventName 消息标示
		 * @param {function} handler 消息处理
		 * @param {object} [scope] 函数作用域
		 */
		subscribe : function(eventName, handler, scope) {
			if (!queue[eventName])
				queue[eventName] = [];
			queue[eventName].push({
				scope : scope,
				handler : handler
			});
		},

		/**
		 * 取消订阅
		 * @method Common.cMessageCenter.unsubscribe
		 * @param {string} eventName 消息标示
		 * @param {function} handler 消息处理函数句柄
		 */
		unsubscribe : function(eventName, handler) {
			if (queue[eventName]) {
				var _queue = [];
				if (handler) {
					$.each(queue[eventName], function(index, item) {
						if(item.handler == handler){
							_queue.push(handler);
						}
					});
					queue[eventName] = _queue;
				} else {
					delete queue[eventName];
				}
			}
		}
	};
	return observer;
});
