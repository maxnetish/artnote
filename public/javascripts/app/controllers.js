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
            $scope.record = dataService.get({recordId: $routeParams.recordId});
        }
    ]);