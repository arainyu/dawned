define(function () {
    var basePath = Dawned.dir;
    
	var configs = {
        waitSeconds: 20,
        shim: {
            $: {
                exports: '$'
            },
            _: {
                exports: '_'
            },
            libs: {
                deps: ['$', '_', 'text'],
                exports: 'libs'
            }
        },
        paths: {
            "json2": basePath + "3rdlibs/json2",
            "R": basePath + "3rdlibs/require",
            '$': basePath + "3rdlibs/jquery-1.11.3.min",
            "text": basePath + "3rdlibs/require.text",
            "Handlebars": basePath + "3rdlibs/handlebars",
            
            //core
            "CoreInherit": basePath + "core/class.inherit",
            "CoreObserver": basePath + "core/observer",
            "CoreAjax": basePath + "core/ajax",
            
            //data
            "AbstractModel": basePath + "data/model/abstract.model",
            "BaseModel": basePath + "data/model/base.model",
            
            "AbstractStorage": basePath + "data/storage/abstract.storage",
            "LocalStorage": basePath + "data/storage/local.storage",
            "SessionStorage": basePath + "data/storage/session.storage",
            "MemoryStorage": basePath + "data/storage/memory.storage",
            
            "AbstractStore": basePath + "data/store/abstract.store",
            "LocalStore": basePath + "data/store/local.store",
            "SessionStore": basePath + "data/store/session.store",
            "MemoryStore": basePath + "data/store/memory.store",
            
            //utils
            'UtilsPath': basePath + "utils/path",
            'UtilsParser': basePath + "utils/parser",
            'UtilsDate': basePath + "utils/date",
            'UtilsObject': basePath + "utils/object",
            
            //app
            'AppStart': basePath + "app/app.start",
            'AppInit': basePath + "app/app.init",
            'AbstractApp': basePath + "app/abstract.app",
            'App': basePath + "app/app",
            
            //page
            'PageAbstractController': basePath + "page/controller/abstract.controller",
            'HandleBarController': basePath + "page/controller/handlebar.controller",
            
            'PageAbstractView': basePath + "page/view/abstract.view",
            'HandleBarView': basePath + "page/view/handlebar.view"
        }
   };
    
    if("undefined" == typeof JSON || typeof JSON.parse !== 'function' || typeof JSON.stringify !== 'function'){
    	configs.shim.libs.deps.push('json2');
    }
    
    require.config(configs);
});