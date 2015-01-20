(function() {
	var app = angular.module('todoApp');

	app.directive('move', function() {
		var moving, upKey = 38, downKey = 40;

		return function(scope, elem, attrs) {
			elem.bind('keydown', function(event) {
				moving = angular.element('.moving')[0];
				console.log(angular.element(moving).attr('ng-model'));
				if (event.keyCode === upKey && moving) {
					scope.$apply(angular.element(moving).attr('move-up'));
				}
			});
		}
	});
})();