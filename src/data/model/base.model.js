/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'AbstractModel', 'AbstractStore', 'UtilsObject'], function (CoreInherit, AbstractModel, AbstractStore, UtilsObject) {
    var Model = new CoreInherit.Class(AbstractModel, {
	    /**
	     * @description 复写自顶层Class的__constructor__，初始化队列
	     * @private
	     */
		__constructor__: function () {
		
			// 自定义head结构
			this.headinfo = null;
			
			// 查询结果
			this.result = null;

			// 请求如果返回auth是否，是否跳转至登录页
			this.checkAuth = true;

			this.onBeforeExecute = null;
		},
		
	    /**
	     * @description 复写自顶层Class的initialize，赋值队列
	     * @param $super
	     * @param options
	     */
		initialize: function ($super, options) {
			$super(options);
		},


	    /**
      	 * @description 用户数据，返回数据存储的tag
	     * @returns {*|JSON.stringify}
	     */
		getTag: function () {
			var params = this.getParamData();
			return JSON.stringify(params);
		},
		/**
		 * 获取查询参数，如果param设置的一个Store,则返回store的值
		 * @returns {*}
		 */
		getParamData: function () {
			var _params = this.param instanceof AbstractStore ? this.param.get() : this.param;
			return CoreInherit.extend({}, _params);
		},
		
		/**
		 * 获取结果参数，如果param设置的一个Store,则返回store的值
		 * @returns {*}
		 */
		getResult: function () {
			var result = this.result instanceof AbstractStore ? this.result.get() : this.result;
			return CoreInherit.extend({}, result);
		},


		/**
		 * @description 取model数据
		 * @param onComplete 取完的回调函 传入的第一个参数为model的数第二个数据为元数据，元数据为ajax下发时的ServerCode,Message等数
		 * @param onError 发生错误时的回调
		 * @param ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
		 * @param scope 可选，设定回调函数this指向的对象
		 * @param onAbort 可选，但取消时会调用的函数
		 */
		execute: function (onComplete, onError, ajaxOnly, scope, onAbort) {
			if (typeof this.onBeforeExecute === 'function') {
				this.onBeforeExecute.call(scope || this);
			}

			var params = this.getParamData();

			// 获得storage的tag
			var tag = this.getTag();
			
			// 从storage中获取上次请求的数据缓存
			var cache = this.result && this.result.get(tag);

			//如果没有缓存，或者指定网络请求，则发起ajax请求
			if (!cache || this.ajaxOnly || ajaxOnly) {
				var headinfo = this.headinfo instanceof AbstractStore ? this.headinfo.get() : this.headinfo;
				if (this.method.toLowerCase() !== 'get' && this.contentType !== AbstractModel.CONTENT_TYPE_JSONP && this.headinfo) {
					params.head = headinfo;
				} else {
					CoreInherit.extend(params, headinfo);
				}

				this.onBeforeSuccessCallback = function (datamodel) {
					if (this.result instanceof AbstractStore) {
						this.result.set(datamodel, tag);
					} else {
						this.result = datamodel;
					}
				}
				
				//调用父类的数据请求方法
				this._execute(onComplete, onError, null, scope, onAbort, params)

			} else {
				if (typeof onComplete === 'function') {
					onComplete.call(scope || this, cache);
				}
			}
		},
      
		/**
		 * 设置model 的param对象，有两种使用情况
		 * 1. 当只传一个参数key，且key为对象，此时key为要设置的值
		 * 2. 传两个参数，第一个参数key为字符串(允许.分隔),第二个参数val为要设置的值
		 * 注意两次调用setParam,两次参数会做合并处理
		 * @param {Object|string} key 参数，
		 * @param {Object} [val] 参数值
		 */
		setParam: function (key, val) {
			var param = {};

			if (typeof key === 'object' && !val) {
				param = key;
			} else {
				param[key] = val;
			}

			for (var i in param) {
				if (this.param instanceof AbstractStore) {
					this.param.setAttr(i, param[i]);
				} else {
					UtilsObject.set(this.param, i, param[i]);
				}
			}
		},

		/**
		 * 清空结果数据
		 * @method Model.cModel.clearResult
		 */
		clearResult: function () {
			if (this.result && typeof this.result.remove === 'function') {
				this.result.remove();
			} else {
				this.result = null;
			}
		}
    });


    return Model;
});
