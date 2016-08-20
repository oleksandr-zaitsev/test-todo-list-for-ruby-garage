'use strict';
var App = App || {
        Models: {},
        Views: {},
        Routers: {},
        Collections: {},
        Constants: {
            EMAIL_PATTERN: /^[-a-z0-9~!$%^&*_=+}{\'?]+(?:\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(?:[a-z0-9_][-a-z0-9_]*(?:\.[-a-z0-9_]+)*\.(?:aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|(?:[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(?:[0-9]{1,5})?$/gi
        }
    };

define(['backbone', 'backbone_router_event_mod', 'routers/main'],
    function(Backbone, BackboneRouterEventMod, MainRouter) {
    return {
        initialize: function() {
            App.Routers.Main = App.Routers.Main || new MainRouter();
            Backbone.history.start();
        }
    };
});