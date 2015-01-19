(function () {

	var app = angular.module('todoApp');

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

})();

