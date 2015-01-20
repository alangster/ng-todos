(function() {
	var app = angular.module('todoApp');

	app.directive('moveable', function() {

		return function(scope, elem, attrs) {
			elem.bind('dblclick', function(event) {
				if (elem.hasClass('moving')) {
					elem.removeClass('moving');
					return;
				}
				var current = angular.element('.moving');
				if (current) {current.removeClass('moving')};
				elem.addClass('moving');
			})
		}
	});
})();