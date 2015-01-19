(function() {

	var app = angular.module('todoApp');

	app.controller('createTodoController', function ($scope, $rootScope, $http, $cookieStore) {

		var url = 'http://recruiting-api.nextcapital.com/users/';

		$scope.createTodo = function() {
			var createUrl = url + $cookieStore.get('user_id') + '/todos';
			var data = { 'api_token': $cookieStore.get('api_token'), 'todo' : { 'description': $scope.newTodo.description } };
			$http.post(createUrl, data)
				.success(function(response) {
					$scope.notSavedError = null;
					$scope.newTodo.description = "";
					$rootScope.$broadcast('todoCreated', response);
				})
				.error(function(response) {
					$scope.notSavedError = "Something went wrong; ToDo not saved.";
				});
		}

	});

})();