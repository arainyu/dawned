/**
 * @copyright http://www.monring.com
 * @author arain.yu(abcily@126.com)
 * @namespace
 * @description
 */
(function() {
	Dawned = typeof Dawned != 'undefined' ? Dawned : {

		/**
		 * Dawned 版本
		 * @var {String} [Dawned.version=1.0]
		 */
		version : "0.0.1",

		/**
		 * 当页面切换完成时调用,用于 Dawned 与外部的借口,外部可以注册这个方法
		 * @method Dawned.viewReady
		 * @param {View} view 切换完成后,当前的view对象
		 */
		viewReady : function(fn) {
			Dawned.readyQueue ? Dawned.readyQueue.push(fn) : (Dawned.readyQueue = [fn]);
		},

		/**
		 * 检测不到require属性，视为没有打包
		 */
		notpackaged : typeof require == 'undefined',

		/**
		 * dawned调用文件目录
		 */
		dir : '',

		/**
		 * 本地配置目录
		 */
		pdConfig : {},

		/**
		 * 站点基本文件路径（或者虚拟目录，两边到'/'）
		 */
		baseUrl : '',

		/**
		 * controllers文件放置路径（baseUrl后面）
		 */
		controllersPath : 'controllers/'
	};

	/*
	 * 解析dawned.seed.js标签的属性，初始化Dawned.dir,Dawned.pdConfig
	 * Dawned.config 三个属性
	 */
	function initDawnedConfig() {
		var scripts = document.getElementsByTagName('script') || [];
		var reg = /dawned\.(src\.|\b)*js.*$/ig;

		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].getAttribute("src");

			if (src && reg.test(src)) {
				Dawned.dir = src.replace(reg, '');

				var configStr = scripts[i].getAttribute("pdConfig") || '';
				Dawned.pdConfig = configStr.split(',');

				break;
			}
		}
	}

	function initMetaConfig($) {
		var metas = $('meta');

		for (var i = 0, len = metas.length; i < len; i++) {
			var $meta = $(metas[i]);
			if ($meta.attr('dawned')) {
				var value = $meta.attr('content');

				switch(value.toLowerCase()) {
					case 'false':
						value = false;
					case 'true':
						value = true;
				}

				Dawned[$meta.attr('name')] = value;
			}
		}
		resetControllersPath();
	}
	
	function resetControllersPath(){
		if(Dawned.controllersPath.indexOf(Dawned.baseUrl) === -1){
			Dawned.controllersPath = Dawned.baseUrl + Dawned.controllersPath;
		}
	}

	/*
	 * 加载单个js文件
	 * @param url
	 * @param callback
	 */
	function loadScript(url, callback) {
		var script = document.createElement("script");
		var header = document.head || document.getElementsByTagName('head')[0];
		script.type = "text/javascript";
		script.async = true;
		if (script.attachEvent && !(script.attachEvent.toString && script.attachEvent.toString().indexOf('[native code') < 0)) {
			script.attachEvent('onreadystatechange', function() {
				if (script.readyState === 'loaded' || script.readyState === 'complete') {
					script.onreadystatechange = null;
					callback();
				}
			});
		} else {
			script.addEventListener('load', callback, false);
		}
		script.src = url;
		header.appendChild(script);
	}

	/*
	 * 加载多个js文件
	 * @param scripts
	 * @param callback
	 */
	function mutileLoad(scripts, callback) {
		var len = scripts.length;
		var no = 0;

		if (!len) {
			end();
			return;
		}
		for (var i = 0; i < len; i++) {
			var url = scripts[i];
			loadScript(url, end);
		}

		function end() {
			no++;
			if (no >= len) {
				callback();
			}
		}

	}

	/*
	 * 加载AMD模块文件
	 * @param e
	 */
	function amdLoaderLoaded(e) {
		var configModel = Dawned.notpackaged ? [Dawned.dir + 'config.js'] : ['config'];
		require(configModel, function() {
			var reqs = ['AppStart'];

			if (!Dawned.notpackaged) {
				define('$', function() {
				});
			}
			require(['$'], function() {
				initMetaConfig($);
				require(reqs, function() {
					if ($.isFunction(arguments[arguments.length - 1])) {
						arguments[arguments.length - 1]();
					}
				});
			});
		});
	}

	/*
	 * 加载资源文件
	 */
	function loadRes() {
		var basescripts = [];
		if (Dawned.notpackaged) {
			basescripts = [Dawned.dir + "3rdlibs/require.js"];
		}

		mutileLoad(basescripts, amdLoaderLoaded);
	}

	//初始化dawned属性
	initDawnedConfig();
	//加载资源文件
	loadRes();

	window.Dawned = Dawned;
})();
