require.config({
    paths: {
        'jquery': 'libs/jquery',
        'handlebars': 'libs/handlebars',
        'text': 'libs/require.text',
        'controllerIndex': 'controllers/index',
        'modelIndex': 'models/index',
        'modelAbsolute': 'core/absolute.model',
        'viewIndex': 'text!'
    },
    baseUrl: '/webapp/'
});

require(['controllerIndex'],
    function(index) {
       //index.init();
    });