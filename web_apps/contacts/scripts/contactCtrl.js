function ContactsController($scope, $route, $http, $location, $routeParams, authService, contactService) {

	if (!authService.isLoggedIn()) {
		$location.path('/');
	}

	$scope.edit = function() {
		var contact_id = $routeParams.contact_id;

		contactService.read($scope, $http, $location, contact_id);
	}


	$scope.create = function() {
		$scope.auth = authService.getAuthStatus();
		var user_id = $scope.auth._id;

		$scope.contact.account = user_id;

		contactService.create($scope, $http, $location);
	}


	$scope.query = function() {
		$scope.auth = authService.getAuthStatus();
		var user_id = $scope.auth._id;

		contactService.query($scope, $http, $location, user_id);
	}

	$scope.update = function(contact_id) {
		contactService.update($scope, $http, $location, contact_id);
	}

	$scope.delete = function(contact) {
		$scope.contacts = _($scope.contacts).reject(function(el) { return el.phone === contact.phone});		
		contactService.delete($scope, $http, $location, contact._id);
	}

}