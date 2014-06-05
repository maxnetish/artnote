/**
 * Created by mgordeev on 04.06.2014.
 */
angular.module('dataServiceModule', ['ngResource'])
    .factory('dataService',
    [
        '$resource',
        function ($resource) {
            return $resource('api/record/:recordId', {}, {
                query: {
                    method:'GET',
                    url: 'api/list',
                    isArray: false
                }
            });
        }
    ]);