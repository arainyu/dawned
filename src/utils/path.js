/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define([], function() {
	var Path = {};

	/**
	 * 解析URL中的各项参数
	 * @method Util.cUtilPath.parseUrl
	 * @param url
	 * @returns {{href: (*|string), hrefNoHash: (*|string), hrefNoSearch: (*|string), domain: (*|string), protocol: (*|string), doubleSlash: (*|string), authority: (*|string), username: (*|string), password: (*|string), host: (*|string), hostname: (*|string), port: (*|string), pathname: (*|string), directory: (*|string), filename: (*|string), search: (*|string), hash: (*|string)}}
	 */
	Path.parseUrl = function(url) {
		var urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
		var matches = urlParseRE.exec(url || "") || [];
		return {
			href : matches[0] || "",
			hrefNoHash : matches[1] || "",
			hrefNoSearch : matches[2] || "",
			domain : matches[3] || "",
			protocol : matches[4] || "",
			doubleSlash : matches[5] || "",
			authority : matches[6] || "",
			username : matches[8] || "",
			password : matches[9] || "",
			host : matches[10] || "",
			hostname : matches[11] || "",
			port : matches[12] || "",
			pathname : matches[13] || "",
			directory : matches[14] || "",
			filename : matches[15] || "",
			search : matches[16] || "",
			hash : matches[17] || ""
		};
	};

	/**
	 * 截取URL参数
	 * @method Util.cUtilPath.getUrlParam
	 * @param {url} url
	 * @param {String} key 参数key名
	 * @returns {String} value 参数值
	 */
	Path.getUrlParam = function(url, name) {
		var re = new RegExp("(\\?|&)" + name + "=([^&]+)(&|$)", "i"), m = url.match(re);
		return m ? m[2] : "";
	};

	/**
	 * 解析URL参数为json对象
	 * @method Util.cUtilPath.getUrlParams
	 * @static
	 * @param {url} url
	 * @returns {Json} object
	 */
	Path.getUrlParams = function(url) {
		var searchReg = /([^&=?]+)=([^&]+)/g;
		var urlParams = {};
		var match, value, length, name;

		while ( match = searchReg.exec(url)) {
			name = match[1];
			value = match[2];
			urlParams[name] = value;
		}

		return urlParams;
	};

	Path.isUrl = function(url) {
		return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(url);
	};

	Path.getControllerNameByUrl = function(url) {
		var hash = Path.parseUrl(url).hash;

		if (!hash) {
			return '';
		} else {
			return Path.getControllerNameByHash(hash);
		}

	};

	Path.creatHashByControllerName = function(controllerName) {
		return '!/'+controllerName;
	};

	Path.getControllerNameByHash = function(hash) {
		if (hash.indexOf('#!/') === 0) {
			return hash.substr(3);
		}

		if (hash.indexOf('#') === 0) {
			return hash.substr(1);
		}
	};

	return Path;
});
