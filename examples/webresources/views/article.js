/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'PageAbstractView', 'text!tplArticle', 'text!tplComment'], function(CoreInherit, AbstractView, tplArticle, tplComment) {
	
	var View = CoreInherit.Class(AbstractView, {
		__constructor__: function(){
			this.tplHtml = tplArticle;
		},
		onCreate: function(){
			console.log('<p>onCreate by article view</p>');	
		},
		onRender: function(){
			console.log('<p>onRender by article view</p>');	
			this.$el.append($(this.template(tplArticle,{title:'Test', content: 'Go'})));
		},
		onShow: function(){
			console.log('<p>onShow by article view</p>');	
		},
		onHide: function(){
			console.log('<p>onHide by article view</p>');	
		},
		renderComments: function(data){
			this.$el.find('.article-comments').html(this.template(tplComment, data));
		}
	});
	
	return View;
});