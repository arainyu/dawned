var rjs = {
	options: {
		baseUrl: '<%= config.SRC_DIR %>',
		optimize: 'none',
		preserveLicenseComments: false
	},
	
	web: {
		options: {
			paths: {
				"json2": "3rdlibs/json2",
	            "R": "3rdlibs/require",
	            '$': "3rdlibs/jquery-1.11.3.min",
	            "text": "3rdlibs/require.text",
	            //"Handlebars": "3rdlibs/Handlebars",
	            "Handlebars": "http://0",
	            
	            //core
	            "CoreInherit": "core/class.inherit",
	            "CoreObserver": "core/observer",
	            "CoreAjax": "core/ajax",
	            
	            //data
	            "AbstractModel": "data/model/abstract.model",
	            "AbstractStorage": "data/storage/abstract.storage",
	            "AbstractStore": "data/store/abstract.store",
	            
	            //utils
	            'UtilsPath': "utils/path",
	            'UtilsParser': "utils/parser",
	            
	            //app
	            'AppStart': "app/app.start",
	            'AppInit': "app/app.init",
	            'AbstractApp': "app/abstract.app",
	            'App': "app/app",
	            
	            //page
	            'PageAbstractController': "page/abstract.controller",
	            'PageAbstractView': "page/abstract.view"
			},
			include: [
				'json2',
				'R',
				'$',
				'libs',
				'text',
				'Handlebars',
				
				'CoreInherit',
				'CoreObserver',
				'CoreAjax',
				
				'AbstractModel',
				'AbstractStorage',
				'AbstractStore',
				
				'UtilsPath',
				'UtilsParser',
				
				'AppStart',
				'AppInit',
				'AbstractApp',
				'App',
				
				'PageAbstractController',
				'PageAbstractView'
			],
	        out: "<%= config.DEST_DIR %>/dawned.src.js"
       }
	}
};
