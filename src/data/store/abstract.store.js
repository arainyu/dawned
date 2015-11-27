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
			 * 时间单位有D:day,H:hour,M:minutes,S:secend,
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
		 * @param {Object} {orVal} 如果启用了数据回滚机制,此参数可以设置备份数据,如rollbackEnabled为true,此参数不传,默认为value
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
		 * @param {String} attrName  支持通过路径的方式，如 setAttr('global.user.name','张三')
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
			var tag = this.getTag(),
				value = this.get(),
				time;
			//覆盖
			if (override) {
				time = this._getNowTime();
				//在原时间点修改时间
			} else {
				time = this.storeProxy.getSaveDate(this.key, true) || this._getNowTime();
			}
			var stime = (new UtilsDate(time.valueOf())).format('Y/m/d H:i:s');
			time.addSeconds(this._getLifeTime());
			this.storeProxy.set(this.key, value, time, tag, stime);
		},


		/**
		 * @description 获取已存取数据
		 * @method Store.cAbstractStore.get
		 * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
		 * @param {boolean} [oldFlag=false] 是否取原始数据
		 * @return {Object} result Store中存储的数据
		 */
		get: function (tag, oldFlag) {
			var result = null, isEmpty = true;
			if (Object.prototype.toString.call(this.defaultData) === '[object Array]') {
				result = this.defaultData.slice(0);
			} else if (this.defaultData) {
				result = _.clone(this.defaultData);
			}
			var obj = this.storeProxy.get(this.key, tag, oldFlag);
			var type = typeof obj;
			if (({ 'string': true, 'number': true, 'boolean': true })[type]) return obj;
			if (obj) {
				if (Object.prototype.toString.call(obj) == '[object Array]') {
					result = [];
					for (var i = 0, ln = obj.length; i < ln; i++) {
						result[i] = obj[i];
					}
				} else {
					if (obj && !result) result = {};
					CoreInherit.extend(result, obj);
				}
			}
			for (var a in result) {
				isEmpty = false;
				break;
			}
			//modify by swzhou 2015-10-30 10:26:01 更新每次接口返回data值為[]時，被標記為空，導致每次都要發起請求
			if (isEmpty && (Object.prototype.toString.call(result) == '[object Array]') && result.length === 0) {
				isEmpty = false;
			}
			return !isEmpty ? result : null;
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
		 * @description 根据liftTime 计算要增加的毫秒数
		 * @returns {number} 根据liftTime 计算要增加的毫秒数
		 */
		_getLifeTime: function () {
			var timeout = 0;
			var str = this.lifeTime + "";
			var unit = str.charAt(str.length - 1);
			var num = +str.substring(0, str.length - 1);
			if (typeof unit == 'number') {
				unit = 'M';
			} else {
				unit = unit.toUpperCase();
			}

			if (unit == 'D') {
				timeout = num * 24 * 60 * 60;
			} else if (unit == 'H') {
				timeout = num * 60 * 60;
			} else if (unit == 'M') {
				timeout = num * 60;
			} else if (unit == 'S') {
				timeout = num;
			} else {
				//默认为秒
				timeout = num * 60;
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
