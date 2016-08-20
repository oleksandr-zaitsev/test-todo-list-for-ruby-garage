'use strict';
define(['backbone', 'helpers/error_reporter', 'helpers/progress_status'],
    function(Backbone, ErrorReporter, ProgressStatus){
    return Backbone.Model.extend({
        defaults: {
            id: '',
            is_logged: false,
            login: '',
            password: '',
            confirm_password: '',
            is_valid_login: false,
            is_valid_password: false,
            is_valid_confirm_password: false
        },
        url: 'router.php',
        check: function(){
            var self = this;
            this.fetch({
                data: {route: 'auth', action: 'check'},
                success: function() {
                    self.trigger('check:finish');
                },
                error: function() {
                    self.trigger('check:error');
                    ErrorReporter.render('Server error occurred');
                }
            });
        },
        signIn: function(){
            var self = this;
            this.save({route: 'auth', action: 'signIn'},{
                success: function() {
                    self.trigger('signIn:finish');
                },
                error: function() {
                    self.trigger('signIn:error');
                    ProgressStatus.clear();
                    ErrorReporter.render('Server error occurred');
                }
            });
        },
        signUp: function(){
            var self = this;
            this.save({route: 'auth', action: 'signUp'},{
                success: function() {
                    self.trigger('signUp:finish');
                },
                error: function() {
                    self.trigger('signUp:error');
                    ProgressStatus.clear();
                    ErrorReporter.render('Server error occurred');
                }
            });
        },
        logout: function(){
            var self = this;
            this.destroy({
                wait: true,
                data: JSON.stringify({route: 'auth', action: 'logout'}),
                success: function() {
                    self.trigger('logout:finish');
                },
                error: function() {
                    self.trigger('logout:error');
                    ErrorReporter.render('Server error occurred');
                }
            });
        }
    });
});