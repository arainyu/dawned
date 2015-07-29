(function(options) {
  var root = this;
  if(typeof module === 'object' && module){
    var Model = require('../../../common/absolute.model');
    module.exports = new Model(options);//NodeJs
  }else{
    if(typeof define === 'function'){
      define(['CoreInherit', 'AbstractModel'], function(CoreInherit, AbstractModel) {
        return CoreInherit.Class(AbstractModel,{
        	__constructor__:function(){
        		this.url = options.path;
        		this.method = 'GET';
        	}
        });
      });
    }
  }
})((function(){
  return  {
    hostname: 'localhost',
    port: '',
    path: '/dawned/examples/data/article.json',
    method: 'GET',
    dataFormate: function(data){
      var _data = data;
      _data.comments.push({
        author: 'test',
        data: '2015-06-15',
        body: 'go'
      });
      return _data;
    }
  };
})());