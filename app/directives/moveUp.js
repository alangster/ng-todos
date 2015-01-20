(function() {
	var app = angular.module('todoApp');

	app.directive('moveUp', function() {
		var upKey = 38;

		return function(scope, elem, attrs) {
			elem.bind('keydown', function(event) {
				if (event.keyCode === upKey) {
					scope.$apply(attrs.moveUp);
				}
			});
		}
	});
})();