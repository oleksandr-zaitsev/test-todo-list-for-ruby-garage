'use strict';
define(['backbone','models/project'], function(Backbone,ProjectModel){
	return Backbone.Collection.extend({
		model: ProjectModel,
		comparator: function(model){
			return parseInt(model.get('position'));
		}
	});
});