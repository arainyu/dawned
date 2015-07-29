/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'PageAbstractView', 'text!tplIndex'], function(CoreInherit, AbstractView, tplIndex) {
	
	var View = CoreInherit.Class(AbstractView, {
		__constructor__: function(){
			this.tplHtml = tplIndex;
		}
	});
	
	return View;
});
