/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define([], function(){
		var Model = function(options) {
		var data = JSON.stringify(options.params) || "";

		this.params = data;
		this.hostname = options.hostname;
		this.port = options.port;
		this.path = options.path;
		this.method = options.method || 'POST';
		this.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		};

		this.dataFormate = options.dataFormate || function(data) {
			return data;
		};

	};

	Model.prototype.excute = function(callback, err) {
		var self = this;
		var _options = {
			hostname: self.hostname,
			port: self.port,
			path: self.path,
			method: self.method,
			headers: self.headers
		};

		$.ajax({
			url: 'http://' + self.hostname + (self.port ? ':' + self.port : '') + self.path,
			method: self.method || 'POST',
		}).done(function(data) {
			var _data = data;
			if (typeof _data == 'string') {
				_data = JSON.stringify(data);
			}
			callback(self.dataFormate(data));
		}).fail(err);
	};

	return Model;
});
