'use strict';

var _env = {};

// Import variables if present (from env.js)
if (window) {  
  Object.assign(_env, window.__env);
}

// Register modules
var gModule = angular.module('app', [
    'ngStorage',
    'ngRoute',
    'auth-service',
    'home-controller',
    'users-controller'
])

// Settings
.constant('env', _env)

/*
// Authorization header is set to each request in the AuthService with:
//     $http.defaults.headers.common.Authorization
// This interceptor approach is alternative for $resource
.factory('oAuthHttpInterceptor', ['$localStorage', 
function ($localStorage) {
    return {
        request: function (config) {
            //if (config.headers.Authorization === 'Bearer') {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            //}
            return config;
        }
    };
}])
*/

// Configuration
.config(['$httpProvider', '$locationProvider', '$routeProvider', 'ngDialogProvider', 
function($httpProvider, $locationProvider, $routeProvider, ngDialogProvider) { 
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/home', {templateUrl: 'views/home.html', controller: 'HomeController'})
        .when('/users', {templateUrl: 'views/users.html', controller: 'UsersController'})
        .otherwise({redirectTo: '/users'});

    // Interceptor for handling reponse error globally
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        return {
            'responseError': function (responseError) {
                $rootScope.message = responseError.data.message;
                return $q.reject(responseError);
            }
        };
    });

    //$httpProvider.interceptors.push('oAuthHttpInterceptor');

    // Enable CORS
    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false
    });
}]);

// Configure logging
function disableLogging($logProvider, __env) {  
    $logProvider.debugEnabled(__env.enableDebug);
}
disableLogging.$inject = ['$logProvider', '__env'];