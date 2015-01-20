(function() {
	var app = angular.module('todoApp');

	app.directive('moveUp', function() {
		var downKey = 40;

		return function(scope, elem, attrs) {
			elem.bind('keydown', function(event) {
				if (event.keyCode === downKey) {
					scope.$apply(attrs.moveDown);
				}
			});
		}
	});
})();