/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define([], function() {
	var contentTypeMap = {
		'json' : 'application/json',
		'jsonp' : 'application/json'
	};

	var _getContentType = function(contentType) {
		if (contentType)
			contentType = contentTypeMap[contentType] ? contentTypeMap[contentType] : contentType;
		return contentType;
	};

	var ajax = (function($) {

		function get(url, data, callback, error, complete, timeout) {
			var opt = _getCommonOpt(url, data, callback, error, complete);
			opt.type = 'GET';
			opt.timeout = timeout;
			return _sendReq(opt);
		};

		function post(url, data, callback, error, complete, timout) {
			var contentType = data.contentType;
			data = JSON.stringify(data);
			var opt = _getCommonOpt(url, data, callback, error, complete);
			opt.type = 'POST';
			opt.dataType = 'json';
			opt.timeout = timout;
			opt.contentType = _getContentType(contentType) || 'application/json';
			return _sendReq(opt);
		};

		function jsonp(url, data, callback, error, complete, timeout) {
			var opt = _getCommonOpt(url, data, callback, error, complete);
			opt.type = 'GET';
			opt.dataType = 'jsonp';
			opt.crossDomain = true;
			opt.timeout = timeout;
			return _sendReq(opt);
		};

		function cros(url, type, data, callback, error, complete, timeout) {
			var contentType = data.contentType;
			var crossDomain = url.indexOf(window.location.host) === -1;

			if (type.toLowerCase() !== 'get') {
				data = JSON.stringify(data);
			}
			var opt = _getCommonOpt(url, data, callback, error, complete);
			opt.type = type;
			opt.dataType = 'json';
			opt.crossDomain = crossDomain;
			opt.data = data;
			opt.contentType = _getContentType(contentType) || 'application/json';
			opt.timeout = timeout;
			if (window.XDomainRequest && crossDomain) {
				return _iecros(opt);
			} else {
				return _sendReq(opt);
			}
		};

		function _sendReq(opt) {

			var obj = {
				url : opt.url,
				type : opt.type,
				dataType : opt.dataType,
				data : opt.data,
				contentType : opt.contentType,
				timeout : opt.timeout,

				success : function(res, status, xhr) {
					opt.callback(res);
				},
				error : function(err) {
					opt.error && opt.error(err);
				},
				complete: function(res){
					opt.complete && opt.complete(res);
				}
			};
			//是否是跨域则加上这条
			if (opt.url.indexOf(window.location.host) === -1) {
				obj.crossDomain = !!opt.crossDomain;
			}

			return $.ajax(obj);
		};

		/**
		 * ie 调用 crors
		 */
		function _iecros(opt) {
			if (window.XDomainRequest) {
				var xdr = new XDomainRequest();
				if (xdr) {
					if (opt.error && typeof opt.error == "function") {
						xdr.onerror = function() {
							opt.error();
							opt.complete && opt.complete(xdr);
						};
					}
					//handle timeout callback function
					if (opt.timeout && typeof opt.timeout == "function") {
						xdr.ontimeout = function() {
							opt.timeout();
						};
					}
					//handle success callback function
					if (opt.success && typeof opt.success == "function") {
						xdr.onload = function() {
							if (opt.dataType) {//handle json formart data
								if (opt.dataType.toLowerCase() == "json") {
									opt.callback(JSON.parse(xdr.responseText));
								}
							} else {
								opt.callback(xdr.responseText);
							}
							
							opt.complete && opt.complete(xdr);
						};
					}

					//wrap param to send
					var data = "";
					if (opt.type == "POST") {
						data = opt.data;
					} else {
						data = $.param(opt.data);
					}
					xdr.open(opt.type, opt.url);
					xdr.send(data);
				}
			}
		};

		function _getCommonOpt(url, data, callback, error, complete) {
			return {
				url : url,
				data : data,
				callback : callback,
				error : error,
				complete: complete
			};
		};

		return {
			get : get,
			post : post,
			jsonp : jsonp,
			cros : cros
		};
	})($);

	return ajax;
});
