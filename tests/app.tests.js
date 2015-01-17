'use strict';

describe('loginController', function() {
	var scope, $httpBackend;

	beforeEach(angular.mock.module('todoApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller, $_httpBackend_) {
		$httpBackend = $_httpBackend_;
		$httpBackend.when('POST', 'http://recruiting-api.nextcapital.com/users/sign_in').respond({id: 704, email: 'joe@bags.com', api_token: 'KGJ24701saGEJ23', todos: Array[0]});

		scope = $rootScope.$new();
		$controller('loginController', {$scope: scope});
	}));

	it('should redirect on successful login', function() {
		// scope.user.email = 'joe@bags.com';
		// scope.user.password = 'boom';
		$httpBackend.flush();
		expect(scope.suc).toBe('woo');
	});
});