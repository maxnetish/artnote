/**
 * Created by mgordeev on 04.06.2014.
 */

angular.module('dataServiceModule', ['ngResource'])
    .config(
    [
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push(function ($q) {
                return{
                    'response': function (response) {
                        if (response && response.data && response.data.data) {
                            if (response.data.status !== 200) {
                                // error:
                                return $q.reject({
                                    status: response.data.status,
                                    message: response.data.message
                                });
                            } else {
                                // really success:
                                response.data = response.data.data;
                            }
                        }
                        return response || $q.when(response);
                    },
                    'responseError': function (rejection) {
                        return $q.reject(rejection);
                    }
                };
            });
        }
    ])
    .factory('dataService',
    [
        '$resource',
        function ($resource) {
            return $resource('api/record/:recordId', {}, {
                query: {
                    method: 'GET',
                    url: 'api/list',
                    isArray: true
                }
            });
        }
    ]);
