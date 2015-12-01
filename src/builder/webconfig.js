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
	            'libs': "3rdlibs/libs",
	            "text": "3rdlibs/require.text",
	            "Handlebars": "3rdlibs/Handlebars",
	            //"Handlebars": "http://0",
				
				//main				
                "seed": "dawned",
                "config": "config",
	            
	            //core
	            "CoreInherit": "core/class.inherit",
	            "CoreObserver": "core/observer",
	            "CoreAjax": "core/ajax",
	            
	            //data
	            "AbstractModel": "data/model/abstract.model",
	            "BaseModel": "data/model/base.model",
				
	            "AbstractStorage": "data/storage/abstract.storage",
	            "SessionStorage": "data/storage/session.storage",
	            "LocalStorage": "data/storage/local.storage",
	            "MemoryStorage": "data/storage/memory.storage",
				
	            "AbstractStore": "data/store/abstract.store",
	            "LocalStore": "data/store/local.store",
	            "SessionStore": "data/store/session.store",
	            "MemoryStore": "data/store/memory.store",
	            
	            //utils
	            'UtilsPath': "utils/path",
	            'UtilsParser': "utils/parser",
	            'UtilsDate': "utils/date",
	            'UtilsObject': "utils/object",
	            
	            //app
	            'AppStart': "app/app.start",
	            'AppInit': "app/app.init",
	            'AbstractApp': "app/abstract.app",
	            'App': "app/app",
	            
	            //page
	            'PageAbstractController': "page/controller/abstract.controller",
	            'HandleBarController': "page/controller/handlebar.controller",
	            'PageAbstractView': "page/view/abstract.view",
	            'HandleBarView': "page/view/handlebar.view"
			},
			include: [
				'json2',
				'R',
				'$',
				'libs',
				'text',
				'Handlebars',
				
				'seed',
				'config',
				
				'CoreInherit',
				'CoreObserver',
				'CoreAjax',
				
				'AbstractModel',
	            "BaseModel",
				
	            "AbstractStorage",
	            "SessionStorage",
	            "LocalStorage",
	            "MemoryStorage",
				
	            "AbstractStore",
	            "LocalStore",
	            "SessionStore",
	            "MemoryStore",
				
				'UtilsPath',
				'UtilsParser',
	            'UtilsDate',
	            'UtilsObject',
				
				'AppStart',
				'AppInit',
				'AbstractApp',
				'App',
				
	            'PageAbstractController',
	            'HandleBarController',
	            'PageAbstractView',
	            'HandleBarView'
			],
	        out: "<%= config.DEST_DIR %>/dawned.src.js"
       }
	}
};
