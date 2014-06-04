/**
 * Created by mgordeev on 03.06.2014.
 */

angular.module('artbookControllers', ['dataServiceModule'])
    .controller('recordListController',
    [
        '$scope',
        'dataService',
        function ($scope, dataService) {
            dataService.getRecords(function (records) {
                $scope.records = records;
            });
        }
    ])
    .controller('recordController',
    [
        '$scope',
        '$routeParams',
        'dataService',
        function ($scope, $routeParams, dataService) {
            $scope.recordId = $routeParams.recordId;
            dataService.getRecord($scope.recordId, function (record) {
                $scope.record = record;
            });
        }
    ]);