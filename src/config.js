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
            "json2": DawnedFE.dir + "3rdlibs/json2",
            "R": DawnedFE.dir + "3rdlibs/require",
            '$': DawnedFE.dir + "3rdlibs/jquery-1.11.3.min",
            '_': DawnedFE.dir + "3rdlibs/underscore",
            "libs": DawnedFE.dir + "3rdlibs/libs",
            "text": DawnedFE.dir + "3rdlibs/require.text",
            
            //core
            "CoreInherit": DawnedFE.dir + "core/class.inherit",
            "CoreObserver": DawnedFE.dir + "core/observer",
            
            //data
            "AbstractModel": DawnedFE.dir + "data/model/abstract.model",
            "AbstractStorage": DawnedFE.dir + "data/model/abstract.storage",
            "AbstractStore": DawnedFE.dir + "data/model/abstract.store",
            
            //app
            'AppInit': DawnedFE.dir + "app/app.init",
        }
    });
});