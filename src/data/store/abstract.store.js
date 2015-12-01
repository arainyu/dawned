/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'UtilsDate', 'UtilsObject'], function (CoreInherit, UtilsDate, UtilsObject) {

	var Store = CoreInherit.Class({
		__constructor__: function () {
			/*
			 * 空对象
			 */
			this.NULL = {};
			/**
			 * Store键值
			 */
			this.key = this.NULL;

			/**
			 * 数据存活时间, 参数传递格式为“时间+时间单位",如30M
			 * 时间单位有D:天,H:小时,M:分钟,S:秒,
			 * 如过不传递时间单位,默认时间单位为M
			 */
			this.lifeTime = '30M';

			/**
			 * 默认返回数据
			 */
			this.defaultData = null;

			/**
			 * 本地存储仓库对象
			 */
			this.storeProxy = this.NULL;

		},
		
		/**
		 * @description 复写自顶层Class的initialize，赋值队列
		 * @param {Object} $super
		 * @param {Object} options
		 */
		initialize: function ($super, options) {
			for (var opt in options) {
				this[opt] = options[opt];
			}

			if (this.key === this.NULL) {
				throw 'key必须被重写';
			}
		},
		
		
		/**
		 * @description 向Store中添加数据
		 * @param {Object} value 要添加的数据
		 * @param {String} [tag] 数据标记，这里的tag，是在get()方法调用时起作用，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
		 */
		set: function (value, tag) {
			var time = this._getNowTime();
			var oldExprieTime = new UtilsDate(this.getExpireTime());
			var oldTimeout = oldExprieTime.getTime();

			time.addSeconds(this._getLifeTime());

			if (time.getTime() < oldTimeout) {
				time = oldExprieTime;
			}

			this.storeProxy.set(this.key, value, time, tag, null);
		},

		/**
		 * @description 设置属性值
		 * @param {String} attrName  支持通过路径的方式，如 setAttr('fullname.firstname.secordChar','d')
		 * @param {Object} attrVal 属性值
		 * @param {String|Number} tag 数据标记，这里的tag，是在get()方法调用时起作用，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
		 */
		setAttr: function (attrName, attrVal, tag) {
			var obj;
			
			if ($.isPlainObject(attrName)) {
				for (var i in attrName) {
					if (attrName.hasOwnProperty(i)) {
						this.setAttr(i, attrName[i], attrVal);
					}
				}
				return;
			}
			
			tag = tag || this.getTag();
			obj = this.get(tag) || {};

			if (obj) {
				UtilsObject.set(obj, attrName, attrVal);
				return this.set(obj, tag);
			}
			return false;
		},

		/**
		 * @description 设置当前对象的过期时间
		 * @param {String} lifeTime 字符串
		 * @param {Boolean}  [override=false] 是否在当前时间点修改,如为否则在saveDate上修改,默认为false
		 */
		setLifeTime: function (lifeTime, override) {
			this.lifeTime = lifeTime;
			
			var tag = this.getTag();
			var value = this.get();
			var time = this._getNowTime();
			var stime;
			
			// 不覆盖保存时间， 在原时间点修改
			if (!override) {
				time = this.storeProxy.getSaveDate(this.key, true) || time;
			}
			
			stime = (new UtilsDate(time.valueOf())).format('yyyy/m/d H:m:s');
			time.addSeconds(this._getLifeTime());
			
			this.storeProxy.set(this.key, value, time, tag, stime);
		},


		/**
		 * @description 获取已存取数据
		 * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
		 * @return {Object} result Store中存储的数据
		 */
		get: function (tag) {
			var resultObj, resultType, resultIsSimpleType, isEmpty;
			var result = this._getDefaultData();
			
			resultObj = this.storeProxy.get(this.key, tag);
			resultType = typeof resultObj;
			resultIsSimpleType = ({ 'string': true, 'number': true, 'boolean': true })[resultType];
			
			if (resultIsSimpleType) {
				return resultObj;
			}
				
			if (resultObj) {
				if (Object.prototype.toString.call(resultObj) == '[object Array]') {
					result = resultObj;
				} else {
					result = result || {};
					CoreInherit.extend(result, resultObj);
				}
			}
			
			isEmpty = $.isEmptyObject(result);
			
			return isEmpty ? null : result;
		},
		
		/**
		 * @description 获取默认数据
		*/
		_getDefaultData: function(){
			var result = null;
			
			if (Object.prototype.toString.call(this.defaultData) === '[object Array]') {
				result = this.defaultData.slice(0);
			} else if (this.defaultData) {
				result = CoreInherit.extend({}, this.defaultData);
			}
			
			return result;
		},

		/**
		 * @description 获取已存取对象的属性
		 * @param {String} attrName 支持通过路径的方式，如 getAttr('global.user.name')
		 * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
		 * @returns {Object} value 数据的属性值
		 */
		getAttr: function (attrName, tag) {
			var obj = this.get(tag);
			var attrVal = null;
			
			if (obj) {
				attrVal = UtilsObject.get(obj, attrName);
			}
			
			return attrVal;
		},
		
		/**
		 * @description 获取数据tag
		 * @returns {String} tag 返回Store的版本标识
		 */
		getTag: function () {
			return this.storeProxy.getTag(this.key);
		},
		
		/**
		 * @description 移除数据存储
		 */
		remove: function () {
			this.storeProxy.remove(this.key);
		},

		/**
		 * @description 移除存储对象的指定属性
		 * @param {String} attrName
		 */
		removeAttr: function (attrName) {
			var obj = this.get() || {};
			if (obj[attrName]) {
				delete obj[attrName];
			}
			this.set(obj);
		},

		/**
	   	 * @description 返回失效时间
		 * @returns {object} exprieTime 过期时间
		 */
		getExpireTime: function () {
			var result = null;
			try {
				result = this.storeProxy.getExpireTime(this.key);
			} catch (e) {
				console && console.log(e);
			}
			return result;
		},

		/**
		 * @description 设置过期时间
		 * @param {Date} time 过期时间
		 */
		setExpireTime: function (time) {
			var value = this.get();
			var cTime = UtilsDate.parse(time);
			this.storeProxy.set(this.key, value, cTime);
		},

		/*
		 * @description 根据liftTime 计算要增加的秒数
		 * @returns {number} 根据liftTime 计算要增加的秒数
		 */
		_getLifeTime: function () {
			var timeout = 0;
			var str = this.lifeTime + "";
			var unit = str.charAt(str.length - 1);
			var num = +str.substring(0, str.length - 1);
			
			if (typeof unit == 'number') {
				num = +str;
			} else {
				unit = unit.toUpperCase();
			}
			
			switch (unit) {
				case 'D':
					timeout = num * 24 * 60 * 60;
					break;
				case 'H':
					timeout = num * 60 * 60;
					break;
				case 'M':
					timeout = num * 60;
					break;			
				default:
					timeout = num;
					break;
			}
			
			return timeout;
		}
	});
	
	/**
	 * @description 单例方法,获取Store的实例
	 * @returns {*}
	 */
	Store.getInstance = function () {
		if (this.instance) {
			return this.instance;
		} else {
			return this.instance = new this();
		}
	};

	return Store;
});
