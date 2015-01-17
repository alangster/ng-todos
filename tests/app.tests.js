'use strict';

describe('loginController', function() {
	var scope;

	beforeEach(angular.mock.module('todoApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller, $_httpBackend_) {
		$httpBackend = $_httpBackend_;
		$httpBackend.when('POST', 'http://recruiting-api.nextcapital.com/users/sign_in').respond({}) 
		scope = $rootScope.$new();
		$controller('loginController', {$scope: scope});
	}));

	it('should have the variable hello', function() {
		expect(scope.hello).toBe("Hello");
	});
});