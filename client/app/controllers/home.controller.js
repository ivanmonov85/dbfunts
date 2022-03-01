'use strict';

angular.module('home-controller', [])
.controller('HomeController', function($rootScope, $scope, $location, $localStorage, AuthService) {
    function successAuth(data) {
        console.info('Auth Success');
        //$location.href = '/';
        window.location = '#!/users';
    }

    $scope.getToken = function () {
        AuthService.getToken(successAuth, function (error) {
            console.error('Auth Error: ' + error);
            $rootScope.error = 'Invalid credentials';
        });
    };

    $scope.logout = function () {
        AuthService.logout();
        console.info('Logged out');
        // refresh
        //location.reload(); 
        window.location = '/'; 
    };

    $scope.token = $localStorage.token;
    $scope.tokenClaims = AuthService.getTokenClaims();
});