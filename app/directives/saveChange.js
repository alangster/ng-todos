(function() {
	var app = angular.module('todoApp');

	app.directive('saveChange', function() {
		var enterKey = 13;

		return function(scope, elem, attrs) {
			elem.bind('keydown', function(event) {
				if (event.keyCode === enterKey) {
					scope.$apply(attrs.saveChange);
				}
			});
		}
	});

})();