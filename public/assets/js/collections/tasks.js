'use strict';
define(['backbone','models/task'], function(Backbone, TaskModel){
	return Backbone.Collection.extend({
		model: TaskModel,
		comparator: function(model){
			return parseInt(model.get('position'));
		}
	});
});