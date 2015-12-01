/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'PageAbstractView', 'Handlebars'], function(CoreInherit, PageAbstractView, Handlebars) {
	var View = CoreInherit.Class(PageAbstractView, {
		__constructor__: function(){
			this.template = function (tpl, data) {
				var _tpl = Handlebars.compile(tpl);
				return _tpl(data);
			}
		}
	});
	
	View.getInstance = function () {
		if (this.instance instanceof this) {
			return this.instance;
		} else {
			return this.instance = new this;
		}
	};
	
	return View;
});
