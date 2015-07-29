/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define(['CoreInherit', 'PageAbstractController', 'ViewIndex', 'ModelIndex'], function(CoreInherit, AbstractController, ViewIndex, ModelIndex) {
	var Controller = CoreInherit.Class(AbstractController, {
		__constructor__: function(){
			this.view = new ViewIndex();
			this.model = ModelIndex;
		},
		onCreate: function(){
			
		}
	});
	return Controller;
});
