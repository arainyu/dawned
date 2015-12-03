/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit'], function (CoreInherit) {

	var utils = {
		isDate: function (input) {
			return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
		},

		getLeadingZeroNumer: function (number) {
			if (number && number.toString().length < 2) {
				number = '0' + number;
			}

			return number;
		},

		getHoursForTwelve: function (date) {
			var hours = date.getHours();
			if (hours >= 12) {
				hours = hours - 12;
			}
			return hours;
		},

		parse: function (str) {
			var date = new Date();

			if (typeof str === 'string') {
				str = str || '';
				var regtime = /^(\d{4})\-?(\d{1,2})\-?(\d{1,2})/i;
				var _date;
				
				if (str.match(regtime)) {
					str = str.replace(regtime, "$2/$3/$1");
				}
				
				_date = Date.parse(str);
				
				if(_date){
					date = _date;
				}
				
			} else if (typeof str === 'number') {
				date =  Date(str);
			}

			return date;
		}
	};

	var CoreDate = CoreInherit.Class({

		__constructor__: function () {
			this.date = new Date();

			this.AbbreviatedDayNames = [];
			this.DayNames = [];
			this.AbbreviatedMonthNames = [];
			this.MonthNames = [];
		},

		initialize: function (date) {

			if (utils.isDate(date)) {
				this.date = date;
				return;
			}
			
			if(date instanceof CoreDate){
				this.date = date.date;
				return;
			}

			if (date && (typeof date === 'string')) {
				date = date.replace(/-/g, '/');
				this.date = new Date(date);
			}
		},

		_formatDay: function (matchStr) {
			var day = this.date.getDate();

			switch (matchStr.length) {
				case 2:
					day = utils.getLeadingZeroNumer(this.date.getDate());
					break;
				case 3:
					day = this.AbbreviatedDayNames[day];
					break;
				case 4:
					day = this.DayNames[day];
					break;

				default:
					break;
			}

			return day;
		},

		_formatMonth: function (matchStr) {
			var month = this.date.getMonth();

			switch (matchStr.length) {
				case 2:
					month = utils.getLeadingZeroNumer(month + 1);
					break;
				case 3:
					month = this.AbbreviatedMonthNames[month];
					break;
				case 4:
					month = this.MonthNames[month];
					break;
				default:
					month = month + 1
					break;
			}

			return month;

		},

		_formatYear: function (matchStr) {
			var year = this.date.getYear();

			if (matchStr.length === 4) {
				year = this.date.getFullYear();
			}

			return year;
		},

		_formatHours: function (matchStr) {
			var hours = this.date.getHours(this.date);
			if (matchStr.lenght === 2) {
				hours = utils.getLeadingZeroNumer(hours)
			}
			return hours;
		},

		_formatHoursForTwelve: function (matchStr) {
			var hours = utils.getHoursForTwelve(this.date);

			if (matchStr.lenght === 2) {
				hours = utils.getLeadingZeroNumer(hours);
			}

			return hours;
		},

		_formatMinutes: function (matchStr) {
			var minutes = this.date.getMinutes();

			if (matchStr.lenght === 2) {
				minutes = utils.getLeadingZeroNumer(minutes);
			}

			return minutes;
		},

		_formatSecords: function (matchStr) {
			var secords = this.date.getSeconds();

			if (matchStr.lenght === 2) {
				secords = utils.getLeadingZeroNumer(secords);
			}

			return secords;
		},
				
		/**
		 * @description 格式化日期
		 * @param {String} formatStr
		 * @returns {CoreDate}
		 */
		format: function (formatStr) {
			var format = formatStr;

			var _maps = {
				'd+': this._formatDay,
				'M+': this._formatMonth,
				'y+': this._formatYear,
				'h+': this._formatHoursForTwelve,
				'H+': this._formatHours,
				'm+': this._formatMinutes,
				's+': this._formatSecords
			};

			if (typeof formatStr !== 'string') {
				format = '';
			}

			for (var key in _maps) {
				if (new RegExp("(" + key + ")").test(format)) {
					format = format.replace(RegExp.$1, _maps[key].call(this, RegExp.$1));
				}
			}

			return format;
		},
		
		/**
		 * @description 当前时间加n年
		 * @param {Number} number
		 * @returns {CoreDate}
		 */
		addYears: function (number) {
			var _number = number || 0;
			this.date.setYear(this.date.getFullYear() + _number);
			return this;
		},
		
		/**
		 * @description 当前时间加n月
		 * @param {Number} number
		 * @returns {CoreDate}
		 */
		addMonth: function (number) {
			var _number = number || 0;
			this.date.setMonth(this.date.getMonth() + _number);
			return this;
		},
		
		/**
		 * @description 当前时间加n天
		 * @param {Number} number
		 * @returns {CoreDate}
		 */
		addDays: function (number) {
			var _number = number || 0;
			this.date.setDate(this.date.getDate() + _number);
			return this;
		},
		
		/**
		 * @description 当前时间加n小时
		 * @param {Number} number
		 * @returns {CoreDate}
		 */
		addHours: function (number) {
			var _number = number || 0;
			this.date.setHours(this.date.getHours() + _number);
			return this;
		},
		
		/**
		 * @description 当前时间加n分钟
		 * @param {Number} number
		 * @returns {CoreDate}
		 */
		addMinutes: function (number) {
			var _number = number || 0;
			this.date.setMinutes(this.date.getMinutes() + _number);
			return this;
		},
		
		/**
		 * @description 当前时间加n秒
		 * @param {Number} number
		 * @returns {CoreDate}
		 */
		addSeconds: function (number) {
			var _number = number || 0;
			this.date.setSeconds(this.date.getSeconds() + _number);
			return this;
		},
		
		/**
		 * @description 获取JS原生Date对象
		 * @returns {Date}
		 */
		valueOf: function () {
			return this.date;
		},
		
		/**
		 * @description 获取日期时间毫秒数
		 * @returns {Number}
		 */
		getTime: function () {
			return this.date.valueOf();
		},
		
		/**
		 * @description 获取utc日期字符串
		 * @returns {String}
		 */
		toString: function () {
			return this.date.toString();
		}
	});


	CoreDate.isDate = utils.isDate;

	CoreDate.parse = utils.parse;


	return CoreDate;
});
