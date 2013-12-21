contactApp.factory('contactService', function($rootScope, $http) {
	
	var contactSvc = {};	

	contactSvc.query = function($scope, $http, $location, user_id) {
		$http.get('/api/v1/contacts/' + user_id)
			.success(function(data, status, headers,config) {
				$scope.contacts=eval(data.info);
				console.log($scope.contacts);
			}).error(function (data, status, headers, config) {
				
		});
	}

	contactSvc.read = function($scope, $http, $location, contact_id) {

		$http.get('/api/v1/contacts/view/' + contact_id)
			.success(function (data, status, headers, config) {
				$scope.contact = eval(data.info)[0];
				console.log($scope.contact);    
			}).error(function (data, status, headers, config) {
				
		});	
	}
	
	contactSvc.create = function($scope, $http, $location) {
		$http({
			url: '/api/v1/contacts',
			method: "POST",
			data: $scope.contact
		}).success(function (data, status, headers, config) {
			$location.path('/view');
		}).error(function (data, status, headers, config) {
			
		});	
	}

	contactSvc.update = function($scope, $http, $location, contact_id) {
		$http({
			url: '/api/v1/contacts/' + contact_id,
			method: "PUT",
			data: $scope.contact
		}).success(function (data, status, headers, config) {
			$location.path('/view');
		}).error(function (data, status, headers, config) {
			
		});
	}

	contactSvc.delete = function($scope, $http, $location,contact_id) {
		$http({
			url: '/api/v1/contacts/' + contact_id, 
			method: "DELETE"
		}).success(function (data, status, headers, config) {
			
		}).error(function (data, status, headers, config) {
			
		});
	}

	return contactSvc;

});