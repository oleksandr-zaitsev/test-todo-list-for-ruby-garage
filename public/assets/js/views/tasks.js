'use strict';
define(['backbone','jquery_ui','views/task','text!templates/tasks_table.tpl'],
    function(Backbone,JQueryUI,TaskView,TasksTableTpl){
    return Backbone.View.extend({
        template: _.template(TasksTableTpl),
        initialize: function(){
            this.listenTo(App.Views.Todo, 'app:loaded', this.makeTasksSortable);
            this.listenTo(this.collection, 'remove', this.recountOrder);
        },
        render: function(){
            this.prepare();
            this.collection.each(function(model){
                var view = new TaskView({model: model});
                view.listenTo(this, 'child:clear', view.remove);
                this.$el.find('.tasks-table').append(view.render().$el);
            }, this);
            return this;
        },
        makeTasksSortable: function(){
            var self = this;
            this.$el.find('.sortable').sortable().on('sortstop', function() {
                self.recountOrder();
            });
        },
        prepare: function(){
            this.$el.html(this.template());
            this.trigger('child:clear');
        },
        recountOrder: function(){
            var $table = this.$el.find('.position');
            this.collection.each(function(model, index){
                _.each($table, function(element, i){
                    if(parseInt($(element).val()) == (index + 1)){
                        model.set('position', i + 1);
                    }
                });
            });
            App.Views.Todo.trigger('data:save');
        }
    });
});
