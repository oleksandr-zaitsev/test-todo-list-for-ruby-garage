'use strict';
define(['backbone','text!templates/todo.tpl','views/projects','collections/projects','helpers/progress_status','models/project'],
	function(Backbone,TodoTpl,ProjectsView,ProjectsCollection,ProgressStatus,ProjectModel){
	return Backbone.View.extend({
		el: '#workplace-div',
		template: _.template(TodoTpl),
		events: {
			'click #add-project': 'add'
		},
		initialize: function(){
			ProgressStatus.render();
			this.listenTo(this, 'data:save', this.saveData);
			this.listenTo(this.model, 'fetch:finish', this.render);
			this.listenTo(this.model, 'save:finish', this.render);
			this.listenTo(this.model, 'save:error', function(){
				$('#add-project').removeAttr('disabled');
			});
		},
		render: function(){
			ProgressStatus.clear();
			this.$el.html(this.template());
			this.initProjects();
			this.trigger('app:loaded');
			return this;
		},
		initProjects: function(){
			var view = new ProjectsView({
				collection: this.model.get('projects')
			});
			view.render();
		},
		add: function(){
			$('#add-project').attr('disabled', 'disabled');
			var collection = this.model.get('projects');
			collection.add(new ProjectModel({
				name: 'Project #' + (collection.length + 1),
				position: (collection.length + 1)
			}));
			this.trigger('data:save');
		},
		saveData: function(){
			ProgressStatus.render();
			this.model.saveData();
		}
	});
});
