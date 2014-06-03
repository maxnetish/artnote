/**
 * Created by mgordeev on 03.06.2014.
 */
var artbookApp = angular.module('artbookApp',
    [
        'ngRoute',
        'artbookControllers'
    ]);

artbookApp.config(
    [
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/list', {
                    templateUrl: 'partials/list',
                    controller: 'recordListController'
                })
                .when('/record/:recordId', {
                    templateUrl: 'partials/record',
                    controller: 'recordController'
                })
                .otherwise({
                    redirectTo: '/list'
                });
        }
    ]);