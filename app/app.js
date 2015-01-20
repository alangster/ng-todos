(function () {

	var app = angular.module('todoApp', ['ngRoute', 'ngCookies']);
	
	app.controller('bigController', function ($scope, $rootScope) {
		$scope.moveUp = function(todo) {
			console.log(todo);
			$rootScope.$broadcast('moveUp', todo);
		}
	});

	app.config(function ($routeProvider) {
		$routeProvider
			.when('/', 
			{
				controller: 'loginController',
				templateUrl: '/app/partials/login.html'
			})
			.when('/todos',
			{
				controller: 'todosController',
				templateUrl: '/app/partials/todos.html'
			})
	});
	
})();
