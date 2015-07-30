/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'PageAbstractController', 'ViewArticle', 'ModelArticle'], function(CoreInherit, AbstractController, ViewArticle, ModelArticle) {
	var Controller = CoreInherit.Class(AbstractController, {
		__constructor__ : function() {
			this.view = new ViewArticle();
		},
		onRender : function() {
			var model = new ModelArticle();

			model.excute(_.bind(function(data) {
				this.view.renderComments(data);
			}, this));
			
			this.view.$el.find('.btn-back').on('click',_.bind(function(){
				this.goBack();
			},this));
		}
	});
	return Controller;
});

