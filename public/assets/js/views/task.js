'use strict';
define(['backbone','text!templates/task_row.tpl'],
	function(Backbone,TaskRowTpl){
	return Backbone.View.extend({
		tagName: 'tr',
		events: {
			'click .destroy-task': 'destroy',
			'click .edit-task': 'edit',
			'keyup .task-content-input': 'editFinish',
			'blur .task-content-input': 'editFinish',
			'change .completed': 'changeStatus'
		},
		template: _.template(TaskRowTpl),
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		destroy: function(){
			this.model.collection.remove(this.model);
		},
		edit: function(){
			this.$el.find('.task-content-input').removeClass('hidden').focus();
			this.$el.find('.task-content-span').addClass('hidden');
		},
		editFinish: function(e){
			if(typeof e.keyCode == 'undefined' || e.keyCode == 13){
				this.$el.find('.task-content-input').addClass('hidden');
				this.$el.find('.task-content-span').removeClass('hidden');
				var content = $.trim(this.$el.find('.task-content-input').val());
				if(content && content !== this.model.get('content')) {
					this.model.set('content', content);
					App.Views.Todo.trigger('data:save');
				}
			}
		},
		changeStatus: function(e){
			this.model.set('completed', $(e.target).prop('checked'));
			App.Views.Todo.trigger('data:save');
		}
	});
});
