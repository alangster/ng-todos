var app = angular.module('todoApp', ['ngRoute', 'ngCookies']);

app.controller('loginController', function ($scope, $http, $cookieStore, $location) {
	
	$scope.login = function () {
		var data = {
			"email": $scope.user.email,
			"password": $scope.user.password
		};

		$http.post("http://recruiting-api.nextcapital.com/users/sign_in", data)
			.success(function(response) {
				successResponse(response);
			})
			.error(function(response) {
				$scope.loginForm.error = "Email and/or Password is Incorrect";
			});

		$scope.user.email = "";
		$scope.user.password = "";
			
	};

	$scope.signUp = function () {
		var data = {
			"email": $scope.newUser.email,
			"password": $scope.newUser.password
		};

		$http.post("http://recruiting-api.nextcapital.com/users", data)
			.success(function(response) {
				successResponse(response);
			})
			.error(function(response) {
				console.log(response);
				$scope.signUpForm.errors = response.email;
			});

		$scope.newUser.email = "";
		$scope.newUser.password = "";

	};

	function successResponse(response) {
		$cookieStore.put('key', response.api_token);
		$cookieStore.put('todos', response.todos);
		$cookieStore.put('user_id', response.id);
		$location.path('/todos');
	};

});

app.controller('todosController', function ($scope, $http, $cookieStore, $location) {

	function init() {
		if (!$cookieStore.get('user_id')) {
			$location.path('/');
		}
	}

	init();

});

app.controller('createTodoController', function ($scope, $http, $cookieStore) {

	$scope.createTodo = function() {
		console.log($scope.description);
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