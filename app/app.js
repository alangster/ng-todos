var app = angular.module('todoApp', ['ngRoute', 'ngCookies']);

app.controller('loginController', function ($scope, $http, $cookieStore, $location) {
	
	var url = "http://recruiting-api.nextcapital.com/users";

	$scope.login = function () {
		var data = {
			"email": $scope.user.email,
			"password": $scope.user.password
		};

		var signInUrl = url + '/sign_in';

		$http.post(signInUrl, data)
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

		$http.post(url, data)
			.success(function(response) {
				successResponse(response);
			})
			.error(function(response) {
				$scope.signUpForm.errors = response.email;
			});

		$scope.newUser.email = "";
		$scope.newUser.password = "";

	};

	function successResponse(response) {
		$cookieStore.put('api_token', response.api_token);
		$cookieStore.put('user_id', response.id);
		$location.path('/todos');
	};

});

app.controller('todosController', function ($scope, $rootScope, $http, $cookieStore, $location) {

	var url = 'http://recruiting-api.nextcapital.com/users/' + $cookieStore.get('user_id') + '/todos';

	function init() {
		if (!$cookieStore.get('user_id')) {
			$location.path('/');
		} else {
			var todosUrl = url + '.json?api_token=' + $cookieStore.get('api_token');

			$http.get(todosUrl)
				.success(function(response) {
					$scope.todos = response;
				})
				.error(function(response) {
					console.log(response);
				})
		}
	};

	init();

	function todoData(todo) {
		return {'api_token': $cookieStore.get('api_token'), 'todo': { 'description': todo.description, 'is_complete': todo.is_complete } }
	}

	function sendEditedTodo(todo) {
		var editUrl = url + '/' + todo.id
		$http.put(editUrl, todoData(todo))
			.success(function(response) {
				console.log(response);
			})
			.error(function(response) {
				console.log(response);
			})
	}

	$scope.storeOriginal = function(todo) {
		$scope.original = angular.extend({}, todo);
	};

	$scope.blurred = function(todo) {
		todo.description = $scope.original.description;
	};

	$scope.editDescription = function(todo) {
		sendEditedTodo(todo);
	};

	$scope.toggleCompletion = function(todo) {
		todo.is_complete = !todo.is_complete;
		sendEditedTodo(todo);
	}

	$rootScope.$on('todoCreated', function(context, data) {
		$scope.todos.push(data);
	})


});

app.controller('createTodoController', function ($scope, $rootScope, $http, $cookieStore) {

	var url = 'http://recruiting-api.nextcapital.com/users/';

	$scope.createTodo = function() {
		var createUrl = url + $cookieStore.get('user_id') + '/todos';
		var data = { 'api_token': $cookieStore.get('api_token'), 'todo' : { 'description': $scope.newTodo.description } };
		$http.post(createUrl, data)
			.success(function(response) {
				$scope.newTodo.description = "";
				$rootScope.$broadcast('todoCreated', response);
			})
			.error(function(response) {
				console.log(response);
			});
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