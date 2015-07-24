/**
 * @namespace Common.CoreInherit
 * @description Class类，框架的基础类体系
 * @author zx.yu@ctrip.com
 */
define(function() {

  var slice = [].slice;
  var Core = function() {};

  Core.Class = function() {
    if (arguments.length == 0 || arguments.length > 2) {
    	throw '参数错误';
    }

    var parent = null;
    //将参数转换为数组
    var properties = slice.call(arguments);

    //如果第一个参数为类（function），那么就将之取出
    if (typeof properties[0] === 'function') {
      parent = properties.shift();
    }
    properties = properties[0];

    function klass() {
      this.__constructor__();
      this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;
    klass.subclasses = [];

    var sup__constructor__ = function() {};

    var sub__constructor__ = properties.__constructor__ || function() {};

    if (parent) {
      if (parent.prototype.__constructor__) {
        sup__constructor__ = parent.prototype.__constructor__;
      }

      var subclass = function() {};
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

 
    for (var k in properties) {
      var value = properties[k];
      klass.prototype[k] = value;
    }

    if (!klass.prototype.initialize){
      klass.prototype.initialize = function() {};
    }

    //__constructor__方法直接重写
    klass.prototype.__constructor__ = function() {
      sup__constructor__.call(this);
      sub__constructor__.call(this);
    };

    //非原型属性也需要进行继承
    for (key in parent) {
      if (parent.hasOwnProperty(key) && key !== 'prototype' && key !== 'superclass') {
        klass[key] = parent[key];
      }
    }

    klass.prototype.constructor = klass;

    return klass;
  };

  Core.extend = function() {
    var args = slice.call(arguments);
    var source = args.shift() || {};

    if (!source) return false;

    for (var i = 0, l = args.length; i < l; i++) {
      if (typeof args[i] === 'object') {
        for (var key in args[i]) {
          source[key] = args[i][key];
        }
      }
    }

    return source;
  };

  Core.implement = function(fn, properties) {
    if (typeof fn !== 'function') {
    	return false;
    }

    for (var i in properties) {
      fn.prototype[i] = properties[i];
    }

    return fn;
  };

  return Core;
});