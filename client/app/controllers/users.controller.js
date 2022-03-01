'use strict';

angular.module('users-controller', [
    'ngTable', 
    'ngResource', 
    'ngDialog'
])
.controller('UsersController', function($scope, NgTableParams, $resource, ngDialog, env) {
    $scope.user = {};

	$scope.users = $resource(env.BASE_URL + '/users/:id', { id: '@id' }, {
        // default actions - can be changed
        //'get': { method: 'GET' }
        //'query': { method: 'GET', isArray: true },
        //'save': { method: 'POST' },
        //'delete': { method: 'DELETE' },

        // added custom actions
        'update': { method: 'PUT' }
        //'patch': { method: 'PATCH' }
	});

    $scope.tableParams = new NgTableParams({}, {
		// GET /api/users?page={page}&size={size}&sortDir={dir}&sort={propertyName} - with pagination
        // getData: function(params) {
        //     var queryParams = {
        //         page: params.page() - 1, 
        //         size: params.count()
        //     };
        //     var sortingProp = Object.keys(params.sorting());
        //     if (sortingProp.length == 1) {
        //         queryParams['sort'] = sortingProp[0];
        //         queryParams['sortDir'] = params.sorting()[sortingProp[0]];
        //     }
        //     return $scope.users.query(queryParams, function(data, headers) {
        //         var totalRecords = headers('PAGING_INFO').split(',')[0].split('=')[1];
        //         params.total(totalRecords);
        //         return data;
        //     }).$promise;
        // }

        // GET /api/users - without pagination
        getData: function() {
            return $scope.users.query({}, function(data) {
                return data;
            }).$promise;
        }
    });

	$scope.addNewUser = function() {
        $scope.user = { name: 'John Doe', username: '', email: '', phone: '', website: '' };
        $scope.openModal();
    }

	$scope.editUser = function(row) {
        $scope.user = $scope.users.get({ id: row.id });
        $scope.openModal();
    }

	$scope.save = function() {
        ngDialog.close('ngdialog1');
        if (!$scope.user.id) {
            $scope.createUser();
        } else{
            $scope.updateUser();
        }
    }

    $scope.removeUser = function(id, name) {
		if (confirm('Are you sure to delete ' + name + ' ?\nTHIS ACTION CANNOT BE UNDONE !!!')) {
			$scope.deleteUser(id);
		}
    }

	$scope.createUser = function() {
		console.log('createUser called');
        $scope.users.save($scope.user, function() {
			$scope.tableParams.reload();
		});
    }

	$scope.updateUser = function() {
		console.log('updateUser called');
		$scope.users.update($scope.user, function() {
			$scope.tableParams.reload();
		});
	}

    $scope.deleteUser = function(id) {
        console.log('deleteUser called for id ' + id);
        $scope.users.delete({id: id}, function() {
            $scope.tableParams.reload();
        });
    }

    $scope.openModal = function () {
        $scope.dialog = ngDialog.open({
            template: 'components/user.dialog.html',
            scope: $scope

            // preCloseCallback: function(value) {
            //     if (confirm('Are you sure you want to close without saving your changes?')) {
            //         return true;
            //     }
            //     return false;
            // }
        });
    };
});
