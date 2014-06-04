/**
 * Created by mgordeev on 04.06.2014.
 */
angular.module('artbookRoutes',
    [
        'ngRoute'
    ])
    .constant('ROUTE_PATHS', {
        LIST: '/list',
        RECORD: '/record/:recordId'
    })
    .config(
    [
        '$locationProvider',
        function ($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ])
    .config(
    [
        '$routeProvider',
        'ROUTE_PATHS',
        function ($routeProvider, paths) {
            $routeProvider
                .when(paths.LIST, {
                    templateUrl: 'partials/list',
                    controller: 'recordListController'
                })
                .when(paths.RECORD, {
                    templateUrl: 'partials/record',
                    controller: 'recordController'
                })
                .otherwise({
                    redirectTo: paths.LIST
                });
        }
    ]);