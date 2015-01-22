(function() {

	var app = angular.module('todoApp');

	app.controller('todosController', function ($scope, $rootScope, $http, $cookieStore, $location, $filter) {

		var url = 'http://recruiting-api.nextcapital.com/users/' + $cookieStore.get('user_id') + '/todos';
		var completedTodoCount, incompleteTodoCount;

		function countComplete() {
			var count = 0;
			$scope.todos.forEach(function(val, ind) {
				if (val.is_complete) {count++};
			});
			return count;
		};

		(function init() {
			if (!$cookieStore.get('user_id')) {
				$location.path('/');
			} else {
				var todosUrl = url + '.json?api_token=' + $cookieStore.get('api_token');

				$http.get(todosUrl)
					.success(function(response) {
						console.log(response);
						$scope.todos = response;
						completedTodoCount = countComplete();
						incompleteTodoCount = ($scope.todos.length) - completedTodoCount;
						console.log('length: ' + $scope.todos.length);
						console.log('complete: ' + completedTodoCount);
						console.log('incomplete: ' + incompleteTodoCount);
						makeChart();
					})
					.error(function(response) {
						$scope.fetchingError = "Unable to fetch todos. Try again later.";
					})
			}
		})();

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

		$scope.sortableTodos = {
			containment: 'parent',
			cursor: 'move',
			tolerance: 'pointer'
		}

		function makeChart() {
			$scope.highchartsNG = {
				options: {
					  chart: {
							type: 'bar'
					}
				},
				series: [{
					data: [completedTodoCount, incompleteTodoCount]
				}],
			}	
		}

			

	});

})();