/**
 * Created by mgordeev on 03.06.2014.
 */

angular.module('artbookControllers', ['dataServiceModule'])
    .controller('recordListController',
    [
        '$scope',
        'dataService',
        function ($scope, dataService) {
            $scope.records = dataService.query();
            $scope.refresh = function () {
                $scope.records = dataService.query();
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
                record = dataService.get({recordId: recordId});
            } else {
                record = {
                    date: new Date()
                };
            }

            $scope.record = record;

            $scope.save = function () {
                dataService.save($scope.record, function () {
                    //success:
                    window.location.hash = '!/list';
                }, function () {
                    //fail:
                    alert("Failed");
                });
            };
        }
    ]);