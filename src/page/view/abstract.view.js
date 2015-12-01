/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'Handlebars'], function (CoreInherit, Handlebars) {
	var View = CoreInherit.Class({

		__constructor__: function () {
			this.template = function (tpl, data) {
				return tpl;
			}
		},


	});

	return View;
});
