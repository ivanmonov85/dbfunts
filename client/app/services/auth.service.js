'use strict';

angular.module('auth-service', [])
.factory('AuthService', ['$http', '$localStorage', 'env', 
    function ($http, $localStorage, env) {
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Invalid base64url string!';
            }
            return window.atob(output);
            //return Buffer.from(output, 'base64');
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var tokenClaims = getClaimsFromToken();

        return {
            getToken: function(success, error) {
                const data = {
                    client_id: env.CLIENT_ID,
                    client_secret: env.CLIENT_SECRET,
                    audience: env.AUTH_AUDIENCE,
                    grant_type: 'client_credentials'
                };

                $http({
                    method: 'POST',
                    url: env.AUTH_URL,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data)
                })
                .then(function (response) {
                    if (response.data.access_token) {
                        $localStorage.token = response.data.access_token;
                        
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;

                        success(response.data);
                    } else {
                        error();
                    }
                }, 
                function (response) {
                    error(response.data);
                });
            },

            getTokenClaims: function () {
                return tokenClaims;
            },

            logout: function () {
                tokenClaims = {};
                delete $localStorage.token;
                $http.defaults.headers.common.Authorization = '';
            }
        };
    }
]);