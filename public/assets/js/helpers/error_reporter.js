'use strict';
define(['alertify'], function(Alertify) {
	return {
		render: function(msg){
			msg = $.trim(msg);
			if($('.alertify-log').length < 4 && msg){
				Alertify.error(msg, '', 0);
			}
		}
	};
});