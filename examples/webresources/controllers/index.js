/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define([], function() {
	return {
		onCreate : function() {

			$('body').html("<h1>Come on, I'm the first view.</h1><a href=\"#\" id=\"swith_page\" >切换页面</a>");

			$('#swith_page').on('click', function(e) {
				Dawned.goTo('article');
			});
		}
	};
});
