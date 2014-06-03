/**
 * Created by mgordeev on 03.06.2014.
 */

var artbookControllers = angular.module('artbookControllers', []);

artbookControllers.controller('recordListController',
    [
        '$scope',
        '$http',
        function ($scope, $http) {
            $http.get('api/list')
                .success(function (data) {
                    $scope.records = data.data;
                });
        }
    ]);

artbookControllers.controller('recordController',
    [
        '$scope',
        '$http',
        '$routeParams',
        function ($scope, $http, $routeParams) {
            $scope.recordId = $routeParams.recordId;
            $http.get('api/record/' + $scope.recordId)
                .success(function(data){
                    $scope.record = data.data;
                });
        }
    ]);