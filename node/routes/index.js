var express = require('express');
var router = express.Router();
var model = require('../public/webapp/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	model.requestData(function(data) {
		res.render('index', data);
	});
});

module.exports = router;