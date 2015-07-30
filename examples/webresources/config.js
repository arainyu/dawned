/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
var baseUrl = 'webresources/';
require.config({
	paths : {
		//views
		'ViewIndex' : baseUrl + 'views/index',
		'ViewArticle' : baseUrl + 'views/article',

		//views
		'ModelIndex' : baseUrl + 'models/index',
		'ModelArticle' : baseUrl + 'models/article',

		//template
		'tplIndex' : baseUrl + 'templates/index.hbs',
		'tplArticle' : baseUrl + 'templates/article.hbs',
		'tplComment' : baseUrl + 'templates/article/comments.hbs'
	}
});
