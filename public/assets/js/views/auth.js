'use strict';
define(['backbone', 'text!templates/sign_in.tpl', 'text!templates/sign_up.tpl', 'helpers/progress_status', 'helpers/error_reporter'],
    function(Backbone, SignInTpl, SignUpTpl, ProgressStatus, ErrorReporter) {
    return Backbone.View.extend({
        el: '#workplace-div',
        events: {
            'click #sign-up-btn': 'signUp',
            'click #sign-in-btn': 'signIn',
            'focus input': 'removeNotifier',
            'update input': 'updateModel'
        },
        initialize: function(){
            this.listenTo(this.model, 'signUp:finish', this.signUpFinish);
            this.listenTo(this.model, 'signIn:finish', this.signInFinish);
            this.listenTo(this.model, 'logout:finish', this.logoutFinish);
        },
        render: function(config){
            var template = '';
            if(config.mode == 'signUp'){
                template = _.template(SignUpTpl);
            } else {
                template = _.template(SignInTpl);
            }
            this.$el.html(template());
            return this;
        },
        removeNotifier: function(e){
            $(e.target).removeClass('danger-highlighter');
        },
        addNotifier: function($target, type){
            $target.addClass('danger-highlighter');
            var msg ='Error occurred';
            switch(type){
                case 'login':
                    msg = 'Email must be valid';
                    break;
                case 'password': case 'confirm_password':
                msg = 'Password must contain at least 8 characters';
                break;
                case 'passwords_do_not_match':
                    msg = 'Passwords do not match';
                    break;
            }
            ErrorReporter.render(msg);
        },
        updateModel: function(e){
            var $target = $(e.target);
            var attr = $target.attr('id');
            var value = $.trim($target.val()) || '';
            var valid = false;
            switch(attr){
                case 'login':
                    if(value.search(App.Constants.EMAIL_PATTERN) === -1){
                        this.addNotifier($target, attr);
                        valid = false;
                    } else {
                        this.removeNotifier(e);
                        valid = true;
                    }
                    break;
                case 'password': case 'confirm_password':
                    if(value.length < 8){
                        this.addNotifier($target, attr);
                        valid = false;
                    } else {
                        this.removeNotifier(e);
                        valid = true;
                    }
                    break;
            }
            this.model.set(attr, value);
            this.model.set('is_valid_' + attr, valid);
        },
        signUp: function(){
            $('input').trigger('update');
            var data = this.model.toJSON();
            if(data.password != data.confirm_password) {
                this.addNotifier($('#confirm_password'), 'passwords_do_not_match');
            } else if(data.is_valid_login && data.is_valid_password && data.is_valid_confirm_password){
                ProgressStatus.render();
                this.model.signUp();
            }
        },
        signIn: function(){
            $('input').trigger('update');
            var data = this.model.toJSON();
            if(data.is_valid_login && data.is_valid_password){
                ProgressStatus.render();
                this.model.signIn();
            }
        },
        signInFinish: function(){
            if(this.model.get('is_logged')){
                Backbone.history.navigate('/', true);
                //window.location.reload();
            } else {
                ErrorReporter.render('Incorrect login or/and password');
                ProgressStatus.clear();
            }
        },
        signUpFinish: function(){
            if(this.model.get('is_logged')){
                Backbone.history.navigate('/', true);
                //window.location.reload();
            } else {
                ErrorReporter.render('User already exists');
                ProgressStatus.clear();
            }
        },
        logoutFinish: function(){
            Backbone.history.navigate('#/sign_in', true);
            //window.location.reload();
        }
    });
});