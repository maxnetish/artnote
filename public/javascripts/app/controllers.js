/**
 * Created by mgordeev on 03.06.2014.
 */

angular.module('artbookControllers', ['dataServiceModule'])
    .controller('recordListController',
    [
        '$scope',
        'dataService',
        function ($scope, dataService) {

            dataService.provider.query()
                .then(function (response) {
                    //success
                    $scope.records = response.data;
                }, function (response) {
                    //fail
                    alert(response.message);
                });

            $scope.records = [];

            $scope.refresh = function () {
                dataService.provider.query()
                    .then(function (response) {
                        //success
                        $scope.records = response.data;
                    }, function (response) {
                        //fail
                        alert(response.message);
                    });
            };

            $scope.disableRefresh = false;
        }
    ])
    .controller('recordController',
    [
        '$scope',
        '$routeParams',
        'dataService',
        function ($scope, $routeParams, dataService) {
            var record,
                recordId = $routeParams.recordId;

            if (recordId) {
                dataService.provider.get(recordId)
                    .then(function (response) {
                        $scope.record = response.data;
                    }, function (response) {
                        //fail
                        alert(response.message);
                    });
                $scope.record = {};
            } else {
                $scope.record = new dataService.RecordModel();
            }

            $scope.save = function () {
                dataService.provider.save($scope.record)
                    .then(function (response) {
                        //success
                        window.location.hash = '!/list';
                    }, function (response) {
                        //fail
                        alert(response.message);
                    });
            };

            $scope.remove = function () {
                dataService.provider.remove($scope.record)
                    .then(function (response) {
                        //success
                        window.location.hash = '!/list';
                    }, function (response) {
                        //fail
                        alert(response.message);
                    });
            };

        }
    ]);