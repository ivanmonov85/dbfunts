'use strict';

angular.module('users-controller', [
    'ngTable', 
    'ngResource', 
    'ngDialog'
])
.controller('UsersController', function($scope, NgTableParams, $resource, $localStorage, ngDialog, env) {

	$scope.user = $resource(env.BASE_URL + '/users/:id', { id: '@id' });

	$scope.users = $resource(env.BASE_URL + '/users/:id', { id: '@id' }, {
        'save': { method: 'POST' },
		'update': { method: 'PUT' }
	});

    $scope.tableParams = new NgTableParams({}, {
		//GET /api/users?page={page}&size={size}&sortDir={dir}&sort={propertyName}
        getData: function(params) {
            var queryParams = {
                page: params.page() - 1, 
                size: params.count()
            };
            var sortingProp = Object.keys(params.sorting());
            if (sortingProp.length == 1) {
                queryParams['sort'] = sortingProp[0];
                queryParams['sortDir'] = params.sorting()[sortingProp[0]];
            }
			queryParams = {}; // no pagination is supported yet
            return $scope.users.query(queryParams, function(data, headers) {
                //var totalRecords = headers('PAGING_INFO').split(',')[0].split('=')[1];
                //params.total(totalRecords);
                return data;
            }).$promise;
        }
    });

	$scope.addNewUser = function() {
        $scope.user = { name: 'John Doe', username: '', email: '', phone: '', website: '' };
        ngDialog.open({ template: 'components/user.dialog.html', scope: $scope });
    }

	$scope.editUser = function(row) {
        $scope.user = row;
        ngDialog.open({ template: 'components/user.dialog.html', scope: $scope });
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
});
