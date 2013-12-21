var contactApp = angular.module('contactApp', ['ngCookies']);

contactApp.config(function ($routeProvider) {
	$routeProvider.
	when('/', {
		controller: AuthController,
		templateUrl: '/contacts/templates/landing_page.html'
	}).
	when('/auth', {
		controller: AuthController,
		templateUrl: '/contacts/templates/register.html'
	}).
	when('/dashboard', {
		controller: AuthController,
		templateUrl: '/contacts/templates/dashboard.html'
	}).
	when('/view', {
		controller:ContactsController,
		templateUrl: '/contacts/templates/contacts/view.html',
	}).
	when('/create', {
		controller: ContactsController,
		templateUrl: '/contacts/templates/contacts/create.html'
	}).
	when('/edit/:contact_id', {
		controller: ContactsController,
		templateUrl: '/contacts/templates/contacts/edit.html',
	}).
	otherwise({
		redirectTo: '/error'
	});
});
