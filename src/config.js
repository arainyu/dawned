define(function () {
    require.config({
        waitSeconds: 20,
        shim: {
            $: {
                exports: 'zepto'
            },
            _: {
                exports: '_'
            },
            libs: {
                deps: ['$', '_'],
                exports: 'libs'
            }
        },
        "paths": {
            "json2": Dawned.dir + "3rdlibs/json2",
            "R": Dawned.dir + "3rdlibs/require",
            '$': Dawned.dir + "3rdlibs/jquery-1.11.3.min",
            '_': Dawned.dir + "3rdlibs/underscore",
            "libs": Dawned.dir + "3rdlibs/libs",
            "text": Dawned.dir + "3rdlibs/require.text",
            
            //core
            "CoreInherit": Dawned.dir + "core/class.inherit",
            "CoreObserver": Dawned.dir + "core/observer",
            
            //data
            "AbstractModel": Dawned.dir + "data/model/abstract.model",
            "AbstractStorage": Dawned.dir + "data/model/abstract.storage",
            "AbstractStore": Dawned.dir + "data/model/abstract.store",
            
            //utils
            'UtilsPath': Dawned.dir + "utils/path",
            
            //app
            'AppStart': Dawned.dir + "app/app.start",
            'AppInit': Dawned.dir + "app/app.init",
            'AbstractApp': Dawned.dir + "app/abstract.app",
            'App': Dawned.dir + "app/app",
            
            //page
            'PageBaseController': Dawned.dir + "page/base.controller",
            'PageBaseView': Dawned.dir + "page/base.view"
        }
    });
});