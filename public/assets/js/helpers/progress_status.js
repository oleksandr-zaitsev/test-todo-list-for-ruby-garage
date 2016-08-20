'use strict';
define(['progressbar'], function(ProgressBar) {
	return {
		_$container: $('#progress-status'),
		render: function(){
			this.clear();
			var line = new ProgressBar.Line('#' + this._$container.attr('id'), {
				color: '#6FD57F',
				strokeWidth: 1,
				duration: 2000
			});
			line.animate(1.0);
		},
		clear: function(){
			this._$container.empty();
		}
	};
});