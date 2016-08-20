'use strict';
define(['backbone','backbone_relation'],
	function(Backbone,RelationalModel){
	return Backbone.RelationalModel.extend({
		defaults: {
			position: 0,
			completed: false,
			content: ''
		}
	});
});