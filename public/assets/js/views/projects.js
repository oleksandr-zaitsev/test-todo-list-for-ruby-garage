'use strict';
define(['backbone','helpers/progress_status','views/project'],
	function(Backbone,ProgressStatus,ProjectView){
	return Backbone.View.extend({
		el: '#projects-container',
		render: function(){
			this.prepare();
			this.collection.each(function(model){
				var view = new ProjectView({model: model});
				view.listenTo(this, 'child:clear', view.remove);
				this.$el.append(view.render().$el);
			}, this);
			return this;
		},
		prepare: function(){
			this.$el.empty();
			this.trigger('child:clear');
		}
	});
});