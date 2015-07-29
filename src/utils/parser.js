/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
define([], function() {
	var uuid = 0, ParserUtils = {};
	
	ParserUtils.getViewId = function(){
		var id= "dawed_id_viewport_"+(++uuid)+"_"+(new Date().getTime());
    	return id;
	};
	
	return ParserUtils;
});
