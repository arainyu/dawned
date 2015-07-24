var querystring = require('querystring');
var http = require('http');

var Model = function(options) {
	var data = querystring.stringify(options.params) || "";

	this.params = data;
	this.hostname = options.hostname;
	this.port = options.port;
	this.path = options.path;
	this.method = options.method || 'POST';
	this.headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': data.length
	};

	this.dataFormate = options.dataFormate || function(data){return data};

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

	var req = http.request(_options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(data){
			var _data = JSON.parse(data);
			callback(self.dataFormate(_data));
		});
	});

	req.on('error', function(){
		err.call(this, arguments);
	});

	// write data to request body
	req.write(this.params);
	req.end();
};

module.exports = Model;