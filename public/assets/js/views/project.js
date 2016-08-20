'use strict';
define(['backbone','jquery_ui','helpers/progress_status','views/tasks','text!templates/project.tpl','models/task'],
	function(Backbone, JQueryUI, ProgressStatus,TasksView,ProjectTpl,TaskModel){
	return Backbone.View.extend({
		tagName: 'div',
		className: 'row mt-20',
		template: _.template(ProjectTpl),
		events: {
			'click .add-task': 'addTask',
			'click .edit-project':   'edit',
			'click .delete-project': 'destroy',
			'keyup .project-name-input': 'editFinish',
			'blur .project-name-input': 'editFinish'
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.initTasks();
			return this;
		},
		initTasks: function(){
			var collection = this.model.get('tasks');
			if(!collection.length){
				return false;
			}
			var view = new TasksView({
				el: this.$el.find('.tasks-container'),
				collection: collection
			});
			view.render();
		},
		edit: function(){
			this.$el.find('.project-name-input').removeClass('hidden').focus();
			this.$el.find('.project-name-span').addClass('hidden');
		},
		editFinish: function(e){
			if(typeof e.keyCode == 'undefined' || e.keyCode == 13){
				this.$el.find('.project-name-input').addClass('hidden');
				this.$el.find('.project-name-span').removeClass('hidden');
				var name = $.trim(this.$el.find('.project-name-input').val());
				if(name && name !== this.model.get('name')) {
					this.model.set('name', name);
					App.Views.Todo.trigger('data:save');
				}
			}
		},
		destroy: function(){
			var collection = this.model.collection;
			collection.remove(this.model);
			collection.each(function(model, idx){
				model.set('position', (idx+1));
			}, this);
			App.Views.Todo.trigger('data:save');
		},
		addTask: function(){
			var value = $.trim(this.$el.find('.task-content').val());
			if(!value){
				return false;
			}
			var collection = this.model.get('tasks');
			collection.add(new TaskModel({
				content: value,
				position: (collection.length + 1)
			}));
			this.$el.find('.add-task').attr('disabled', 'disabled');
			App.Views.Todo.trigger('data:save');
		}
	});
});
