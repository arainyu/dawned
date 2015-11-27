define(function () {
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
            "json2": Dawned.dir + "3rdlibs/json2",
            "R": Dawned.dir + "3rdlibs/require",
            '$': Dawned.dir + "3rdlibs/jquery-1.11.3.min",
            "text": Dawned.dir + "3rdlibs/require.text",
            "Handlebars": Dawned.dir + "3rdlibs/handlebars",
            
            //core
            "CoreInherit": Dawned.dir + "core/class.inherit",
            "CoreObserver": Dawned.dir + "core/observer",
            "CoreAjax": Dawned.dir + "core/ajax",
            
            //data
            "AbstractModel": Dawned.dir + "data/model/abstract.model",
            "AbstractStorage": Dawned.dir + "data/storage/abstract.storage",
            "AbstractStore": Dawned.dir + "data/store/abstract.store",
            
            //utils
            'UtilsPath': Dawned.dir + "utils/path",
            'UtilsParser': Dawned.dir + "utils/parser",
            'UtilsDate': Dawned.dir + "utils/date",
            'UtilsObject': Dawned.dir + "utils/object",
            
            //app
            'AppStart': Dawned.dir + "app/app.start",
            'AppInit': Dawned.dir + "app/app.init",
            'AbstractApp': Dawned.dir + "app/abstract.app",
            'App': Dawned.dir + "app/app",
            
            //page
            'PageAbstractController': Dawned.dir + "page/abstract.controller",
            'PageAbstractView': Dawned.dir + "page/abstract.view"
        }
   };
    
    if("undefined" == typeof JSON || typeof JSON.parse !== 'function' || typeof JSON.stringify !== 'function'){
    	configs.shim.libs.deps.push('json2');
    }
    
    require.config(configs);
});