contactApp.factory('authService', function($rootScope, $cookieStore, $location) {
	
	var authSvc = {};

	var _authStatus = {
		logged_in: false,
		errors: false,
		messages: null,
		user: null,
		role: null,
		_id: null
	};

	if ($cookieStore.get('logged_in') == true) {
		var user = $cookieStore.get('user');
		var _id = $cookieStore.get('_id');
		console.log(user);
		_authStatus.logged_in = true;
		_authStatus.user = user;
		_authStatus._id = _id;
		//setAuthStatus(true,false,null,user);
	}

	authSvc.getAuthStatus = function() {
		return _authStatus;
	}

	authSvc.isLoggedIn = function() {
		return $cookieStore.get('logged_in') && $cookieStore.get('user');
	}

	authSvc.login = function($scope, $http, $location) {
		$http.post('/api/v1/auth/login', {
			username: $scope.user.name, password: $scope.user.pass
		}).success(function (data, status, header, config) {

			_authStatus.logged_in = true;
			_authStatus.user = data.info.username;
			_authStatus._id = data.info._id;

			$cookieStore.put('logged_in', true);
			$cookieStore.put('user', data.info.username);
			$cookieStore.put('_id', data.info._id);

			authSvc.broadcastChange();

			$location.path('/dashboard');
		}).error(function (data, status, header, config) {

			_authStatus.messages = response.data;

			$location.path('/');
		})
	}

	authSvc.logout = function($scope, $http, $location) {

			$cookieStore.remove('logged_in');
			$cookieStore.remove('user');
			$cookieStore.remove('_id');

		$http.get(
			'/api/v1/auth/logout'
		).success(function (data, status, header, config) {

			_authStatus = {};
			authSvc.broadcastChange();
			$location.path('/');

		}).error(function (data, status, header, config) {

		})
	    
	}

	authSvc.register = function($scope, $http, $location) {
	    $http.post('/api/v1/auth/register', 
	    	{
	    		username: $scope.user.name, password: $scope.user.pass1, email: $scope.user.email
	    	}
	    ).success(function (data, status, header, config) {
	    	$location.path('/');
	    })	    
	}

	authSvc.broadcastChange = function() {
		$rootScope.$broadcast('handleChangedAuthStatus');
	}

	return authSvc;
});