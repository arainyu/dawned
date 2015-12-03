/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'Handlebars'], function (CoreInherit, Handlebars) {
	var View = CoreInherit.Class({

		__constructor__: function () {
		},
		
		initialize : function($viewport) {
			if (!this.template || !$.isFunction(this.template)) {
				throw '必须存在模版函数';
			}
		},
		
		/**
		 * @description 必须在子类中重写的函数
		*/
		template: function (tpl, data) {
			return tpl;
		}

	});

	return View;
});
