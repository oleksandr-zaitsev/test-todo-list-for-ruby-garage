'use strict';
requirejs.config ({
    waitSeconds: 0,
    baseUrl: 'assets/',
    paths: {
        //libs
        jquery: 'lib/jquery/jquery',
        jquery_ui: 'lib/jquery/jquery-ui.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone/backbone',
        backbone_relation: 'lib/backbone/backbone-relational',
        backbone_router_event_mod: 'lib/backbone/router_event_mod',
        text: 'lib/require/text',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        progressbar: 'lib/progressbar/progressbar.min',
        alertify: 'lib/alertify/alertify.min',
        //application
        templates: 'templates',
        models: 'js/models',
        collections: 'js/collections',
        routers: 'js/routers',
        views: 'js/views',
        helpers: 'js/helpers'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        jquery_ui: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backbone_relation: {
            deps: ['underscore', 'jquery', 'backbone']
        },
        backbone_router_event_mod: {
            deps: ['underscore', 'jquery', 'backbone']
        },
        bootstrap: {
            deps: ['jquery']
        },
        progressbar: {
            deps: ['jquery', 'bootstrap']
        }
    }
});

require(['js/app'], function(App){
    App.initialize();
});