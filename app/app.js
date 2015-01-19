(function () {

	var app = angular.module('todoApp', ['ngRoute', 'ngCookies']);
	
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
