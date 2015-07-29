/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
require.config({
	baseUrl : 'webresources/',
	paths : {
		//views
		'ViewIndex' : 'views/index',
		'ViewArticle': 'views/article',

		//views
		'ModelIndex' : 'models/index',
		'ModelArticle': 'models/article',

		//template
		'tplIndex' : 'templates/index.hbs',
		'tplArticle' : 'templates/article.hbs',
		'tplComment' : 'templates/article/comments.hbs'
	}
});
