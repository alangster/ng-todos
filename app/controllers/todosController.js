(function() {

	var app = angular.module('todoApp');

	app.controller('todosController', function ($scope, $rootScope, $http, $cookieStore, $location, $filter) {

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
						$scope.fetchingError = "Unable to fetch todos. Try again later.";
					})
			}
		};

		init();

		function todoData(todo) {
			return {'api_token': $cookieStore.get('api_token'), 'todo': { 'description': todo.description, 'is_complete': todo.is_complete } }
		}

		function sendEditedTodo(todo) {
			var editUrl = url + '/' + todo.id;

			$http.put(editUrl, todoData(todo))
				.success(function(response) {
					todo.previousDescription = todo.description;
					todo.editError = null;
				})
				.error(function(response) {
					todo.description = todo.previousDescription;
					todo.editError = "Unable to save change.";
				})
		}

		$scope.storeOriginal = function(todo) {
			todo.previousDescription = todo.description;
		};

		$scope.editDescription = function(todo, action) {
			if ( todo.description == todo.previousDescription) {
				return
			}
			sendEditedTodo(todo);
		};

		$scope.toggleCompletion = function(todo) {
			todo.is_complete = !todo.is_complete;
			sendEditedTodo(todo);
		}

		$rootScope.$on('todoCreated', function(context, data) {
			$scope.todos.push(data);
		})


		$rootScope.$on('moveUp', function(context, todo) {
			console.log(todo);
			console.log("got it");
			moveUp(todo);
		})

		var predicate = function(input) {
			return input;
		}

		$scope.displayAll = function() {
			predicate = function(input) {
				return input;
			}
		}

		$scope.displayComplete = function() {
			predicate = function(input) {
				return input.is_complete;
			}
		}

		$scope.displayIncomplete = function() {
			predicate = function(input) {
				return !input.is_complete;
			}
		}

		$scope.status = function(todo) {
			return predicate(todo);
		}

		// $scope.moveUp = function(todo) {
		// 	var index = $scope.todos.indexOf(todo);
		// 	if (index === 0) {
		// 		return;
		// 	}
		// 	var tmp = $scope.todos[index - 1];
		// 	$scope.todos[index - 1] = todo;
		// 	$scope.todos[index] = tmp;
		// }

		var moveUp = function(todo) {
			console.log(todo);
			var index = $scope.todos.indexOf(todo);
			if (index === 0) {
				return;
			}
			var tmp = $scope.todos[index - 1];
			$scope.todos[index - 1] = todo;
			$scope.todos[index] = tmp;
		}

		$scope.moveDown = function(todo) {
			var index = $scope.todos.indexOf(todo);
			if (index === $scope.todos.length - 1) {
				return;
			}
			var tmp = $scope.todos[index + 1];
			$scope.todos[index + 1] = todo;
			$scope.todos[index] = tmp;
		}


	});

})();