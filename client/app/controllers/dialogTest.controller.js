angular.module('dialog-test-controller', [
    'ngDialog'
])
.controller('DialogViewController', function($scope, $rootScope, ngDialog) {

    // Instead of $scope.returnedValue use:
    $scope.data = { returnedValue: '', returnValue: '', user: {} };

    $scope.openModal = function() {
        $scope.data.returnValue = $scope.data.returnedValue;

        var newClassDialog = ngDialog.open({
            template: 'components/test.dialog.html',
            closeByEscape: false,
            controller: 'dialogCtrl',
            className: 'ngdialog-theme-default',
            width: 600,
            scope: $scope
        });

        newClassDialog.closePromise.then(function(data) {
            $scope.data.returnedValue = data.value.result;
        });
    };
})
.controller('dialogCtrl', function($scope, ngDialog) {
    var id = ngDialog.getOpenDialogs()[0];
    $scope.close = () => {
        ngDialog.close(id, { result: $scope.data.returnValue });
    };
});