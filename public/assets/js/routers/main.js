'use strict';
define(['backbone','models/auth','views/auth','helpers/progress_status','views/todo','models/todo'],
    function(Backbone,AuthModel,AuthView,ProgressStatus,TodoView,TodoModel){
    return Backbone.Router.extend({
        routes: {
            '': 'projects',
            'sign_in': 'signIn',
            'sign_up': 'signUp',
            'logout': 'logout',
            '*incorrect': 'incorrect'
        },
        initialize: function(){
            App.Models.Auth = App.Models.Auth || new AuthModel();
            App.Views.Auth  = App.Views.Auth  || new AuthView({model: App.Models.Auth});
        },
        before: function(){
            ProgressStatus.clear();
            this.stopListening(App.Models.Auth, 'check:finish');
        },
        projects: function(){
            this.listenToOnce(App.Models.Auth, 'check:finish', function(){
                if(!App.Models.Auth.get('is_logged')){
                    window.location = '#/sign_in';
                    return false;
                }
                App.Models.Todo = App.Models.Todo || new TodoModel();
                App.Views.Todo = App.Views.Todo || new TodoView({model: App.Models.Todo});
                App.Models.Todo.fetchData();
            });
            App.Models.Auth.check();
        },
        signIn: function(){
            this.listenToOnce(App.Models.Auth, 'check:finish', function(){
                if(App.Models.Auth.get('is_logged')){
                    window.location = '/';
                    return false;
                }
                App.Views.Auth.render({mode: 'signIn'});
            });
            App.Models.Auth.check();
        },
        signUp: function(){
            this.listenToOnce(App.Models.Auth, 'check:finish', function(){
                if(App.Models.Auth.get('is_logged')){
                    window.location = '/';
                    return false;
                }
                App.Views.Auth.render({mode: 'signUp'});
            });
            App.Models.Auth.check();
        },
        logout: function(){
            this.listenToOnce(App.Models.Auth, 'check:finish', function(){
                if(!App.Models.Auth.get('is_logged')){
                    window.location = '/';
                    return false;
                }
                App.Models.Auth.logout();
            });
            App.Models.Auth.check();
        },
        incorrect: function(){
            window.location = '/'
        }
    });
});