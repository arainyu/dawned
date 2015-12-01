/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'PageAbstractController', 'HandleBarView'], function(CoreInherit, PageAbstractController, HandleBarView) {
	var Controller = CoreInherit.Class(PageAbstractController, {
		__constructor__: function(){
			this.view = HandleBarView.getInstance();
		}
	});
	
	return Controller;
});
