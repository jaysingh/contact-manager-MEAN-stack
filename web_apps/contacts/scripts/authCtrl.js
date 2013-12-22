function AuthController($scope, $route, $http, $location, $routeParams, $cookieStore, authService) {

	// Private functions
	var update_auth = function() {
		$scope.auth = authService.getAuthStatus();
		if ($scope.auth.logged_in == true) {
			$scope.auth.status = 'in';
		}	
	};

	// if (!authService.isLoggedIn()) {
	// 	$location.path('/');
	// }


	if ($cookieStore.get('logged_in') == true) {
		$location.path('/dashboard');   				
	}

	$scope.user = null;
	$scope.passwords_same = true;
	update_auth();
	

	$scope.$on('handleChangedAuthStatus', function() {
		update_auth();
	});

	$scope.login = function() {
		authService.login($scope, $http, $location);
	}

	$scope.logout = function() {
		$scope.user = null;
		authService.logout($scope, $http, $location)
	}

	$scope.register = function() {
		authService.register($scope, $http, $location);
	}

	$scope.checkPassword = function() {
		$scope.passwords_same = ($scope.user.pass1 === $scope.user.pass2);
	}

}