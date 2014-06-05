/**
 * Created by mgordeev on 03.06.2014.
 */

angular.module('artbookControllers', ['dataServiceModule'])
    .controller('recordListController',
    [
        '$scope',
        'dataService',
        function ($scope, dataService) {
            $scope.recordsResponse = dataService.query();
            $scope.refresh = function () {
                $scope.recordResponse = {};
                $scope.recordResponse = dataService.query();
            };
            $scope.disableRefresh = !!$scope.recordResponse;
        }
    ])
    .controller('recordController',
    [
        '$scope',
        '$routeParams',
        'dataService',
        function ($scope, $routeParams, dataService) {
            $scope.recordResponse = dataService.get({recordId: $routeParams.recordId});
        }
    ]);