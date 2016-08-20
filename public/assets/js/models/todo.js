'use strict';
define(['backbone','backbone_relation','models/project','collections/projects','helpers/error_reporter','helpers/progress_status'],
	function(Backbone,RelationalModel,ProjectModel,ProjectsCollection,ErrorReporter,ProgressStatus){
	return Backbone.RelationalModel.extend({
		defaults: {
			projects: []
		},
		relations: [{
			type: Backbone.HasMany,
			key: 'projects',
			relatedModel: ProjectModel,
			collectionType: ProjectsCollection,
			reverseRelation: {
				key: 'project_container'
			}
		}],
		url: 'router.php',
		fetchData: function(){
			var self = this;
			this.fetch({
				data: {route: 'todo', action: 'load'},
				success: function() {
					self.trigger('fetch:finish');
				},
				error: function() {
					self.trigger('fetch:error');
					ErrorReporter.render('Server error occurred');
				}
			});
		},
		saveData: function(){
			var self = this;
			this.save({route: 'todo', action: 'save'},{
				success: function() {
					self.trigger('save:finish');
				},
				error: function() {
					self.trigger('save:error');
					ProgressStatus.clear();
					ErrorReporter.render('Server error occurred');
				}
			});
		}
	});
});