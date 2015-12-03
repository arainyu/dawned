/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'UtilsDate'], function (CoreInherit, UtilsDate) {
	var AbstractStorage = CoreInherit.Class({

		__constructor__: function () {
			
			//存儲倉代理，例如localstorage,sessionstorage,cookies
			this.proxy = null;

			this.cacheManagerKey = 'DAWNED_STORE_CACHE_MANAGER';
		},
		
		/**
		 * @description 复写自顶层Class的initialize，赋值队列
		 * @param {Object} options
		 */
		initialize: function ($super, options) {
			for (var opt in options) {
				this[opt] = options[opt];
			}
		},
		

		/**
		 *@description 删除过期缓存
		 */
		removeOverdueCache: function () {
			var now = new UtilsDate().getTime();
			var cacheManagerStr = this.proxy.getItem(this.cacheManagerKey);
			var cacheManager = [];
			var newCacheManager = [];

			if (!cacheManagerStr) {
				return;
			}

			cacheManager = JSON.parse(cacheManagerStr);

			for (var i = 0, len = cacheManager.length, tempObj; i < len; i++) {
				tempObj = cacheManager[i];

				if (new UtilsDate(tempObj.timeout).getTime() < now) {
					this.proxy.removeItem(tempObj.key);
				} else {
					newCacheManager.push(tempObj);
				}
			}

			this.proxy.setItem(this.cacheManagerKey, JSON.stringify(newCacheManager));
		},
		
		/*
		* @description 将缓存的key和过期时间放到缓存中
		* @param {String} key
		* @param {String} timeout
		*/
		_setToCacheManager: function (key, timeout) {

			if (!key || !timeout || UtilsDate.parse(timeout) < new Date()) {
				return;
			}
			
			var oldManagerStr = this.proxy.getItem(this.cacheManagerKey);
			var oldManager = [];
			var isKeyAlreadyIn = false;
			var obj = {
				key: key,
				timeout: timeout
			};

			if (oldManagerStr) {
				oldManager = JSON.parse(oldManagerStr);
			}

			for (var i = 0, tempObj; i < oldManager.length; i++) {
				tempObj = oldManager[i];
				if (tempObj.key == key) {
					//更新最新的过期时间
					oldManager[i] = obj;
					isKeyAlreadyIn = true;
				}
			}

			if (!isKeyAlreadyIn) {
				oldManager.push(obj);
			}

			this.proxy.setItem(this.cacheManagerKey, JSON.stringify(oldManager));
		},
		
		/**
		* @desctription 创建存储对象
		* @param {Object} value 数据对象
		* @param {Date} [timeout] 可选,数据失效时间,如不传,默认过期时间为当前日期过会30天
		* @param {String} [tag] 可选,数据版本标识,如传递此参数,在使用get()时,只有tag相符,才能取到数据
		* @param {Date} [savedate] 可选,数据保存时间
		* @return {Object} 存储对象
		*/
		_createStorageObj: function (value, timeout, tag, savedate) {
			var obj = {
				value: value,
				timeout: timeout,
				tag: tag,
				savedate: savedate
			}

			return obj;
		},
		
		/**
		* @desctription 向Store中存放数据
		* @param {String} key 数据Key值
		* @param {Object} value 数据对象
		* @param {Date} [timeout] 可选,数据失效时间,如不传,默认过期时间为当前日期过会15天
		* @param {String} [tag] 可选,数据版本标识,如传递此参数,在使用get()时,只有tag相符,才能取到数据
		* @param {Date} [savedate] 可选,数据保存时间
		* @return {Boolean} 成功true,失败false
		*/
		set: function (key, value, timeout, tag, savedate) {
			var dateFormater = 'yyyy/MM/dd HH:mm:ss';
			var defaultTimeourDays = 15;
			var formatTime, entity;

			savedate = savedate || (new UtilsDate()).format(dateFormater);

			timeout = timeout ? new UtilsDate(timeout) : new UtilsDate().addDay(defaultTimeourDays);
			formatTime = timeout.format(dateFormater);
			
			//将key和过期时间放到缓存管理器中
			this._setToCacheManager(key, formatTime);

			entity = this._createStorageObj(value, formatTime, tag, savedate);

			try {
				this.proxy.setItem(key, JSON.stringify(entity));
				return true;
			} catch (e) {
				//localstorage写满时,全清掉
				if (e.name == 'QuotaExceededError') {
					this.clear();
					this.set(key, value, timeout, tag, savedate);
				}
				console && console.log(e);
			}
			return false;
		},

		/**
		 * @description 根据key获取value值,如指定的key或attrName未定义返回null
		 * @param {String} key 数据Key会值
		 * @param {String} tag 版本表示,如传递版本参数,则会验证保存的版本与参数是否相符,相符才返回数据,否则返回null,不传此参数
		 * 则不会比较
		 * @return {Object} 取回保存的数据
		 */
		get: function (key, tag) {
			var value = null;
			var result, isNotExpire, isValidTag;

			try {
				result = this.proxy.getItem(key);

				if (result) {
					result = JSON.parse(result);
					isNotExpire = UtilsDate.parse(result.timeout) >= new Date();
					isValidTag = (!tag || (tag && tag === result.tag));

					if (isNotExpire && isValidTag) {
						value = result.value;
					}
				}
			} catch (e) {
				console && console.log(e);
			}
			return value;
		},

		/**
		 * @description 返回存放Storage的tag
		 * @param {String} key 数据Key
		 * @returns {String} 返回此Storager的版本标识
		 */
		getTag: function (key) {
			var result, tag = null;

			try {
				result = this.proxy.getItem(key);
				if (result) {
					result = JSON.parse(result);
					tag = result && result.tag
				}
			} catch (e) {
				console && console.log(e);
			}
			return tag;
		},

		/**
		 * @description 获得某个storage的保存时间
		 * @param {String} key 数据key
		 * @param {Boolean} useUtilsDate 是否返回UtilsDate类型,默认为false
		 * @returns {UtilsDate|Number} 返回Store保存时间
		 */
		getSaveDate: function (key, useUtilsDate) {
			var result, value = null;

			try {
				result = this.proxy.getItem(key);
				if (result) {
					result = JSON.parse(result);
					if (result.savedate) {
						value = UtilsDate.parse(result.savedate);
						if (!useUtilsDate) {
							value = value.valueOf();
						}
					}
				}
			} catch (e) {
				console && console.log(e);
			}
			return value;
		},

		/**
		 * @method Storage.cAbstractStorage.getExpireTime
		 * @param {String} key storage key值
		 * @return {Number} timeout 超时时间,距离1970年的毫秒数
		 * @description 返回指定key的超时时间
		 */
		getExpireTime: function (key) {
			var result = null, time = null;
			try {
				result = this.proxy.getItem(key);
				if (result) {
					result = JSON.parse(result);
					time = Date.parse(result.timeout);
				}
			} catch (e) {
				console && console.log(e);
			}
			return time;
		},
		
		/**
		 * @description 清除指定key
		 * @param {String} key 数据key值
		*/
		remove: function (key) {
			return this.proxy.removeItem(key);
		},
		
	    /**
		 * @description 清空所有storage内容
		*/
		clear: function () {
			this.proxy.clear();
		}

	});

	return AbstractStorage;
});
