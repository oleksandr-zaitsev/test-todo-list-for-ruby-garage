'use strict';
define(['backbone','backbone_relation','models/task','collections/tasks'],
	function(Backbone,RelationalModel,TaskModel,TaskCollection){
	return Backbone.RelationalModel.extend({
		defaults: {
			position: 0,
			name: '',
			tasks: []
		},
		relations: [{
			type: Backbone.HasMany,
			key: 'tasks',
			relatedModel: TaskModel,
			collectionType: TaskCollection,
			reverseRelation: {
				key: 'project'
			}
		}]
	});
});