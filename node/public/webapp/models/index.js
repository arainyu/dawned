(function(options) {
  var root = this;
  if(typeof module === 'object' && module){
    var Model = require('../../../common/absolute.model');
    module.exports = new Model(options);//NodeJs
  }else{
    if(typeof define === 'function'){
      define(['modelAbsolute'], function(Model) {
        return new Model(options);
      });
    }
  }
})((function(){
  return  {
    hostname: 'localhost',
    port: 3000,
    path: '/webapp/data/article.json',
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