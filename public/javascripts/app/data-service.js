/**
 * Created by mgordeev on 04.06.2014.
 */

angular.module('dataServiceModule', [])
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
        '$http',
        '$cacheFactory',
        function ($http, $cacheFactory) {
            var RecordModel = function (row) {
                    row = row || {};
                    this._id = row._id || null;
                    this.title = row.title || "";
                    this.date = row.date ? new Date(row.date) : new Date();
                    this.text = row.text || "";
                    this.tags = row.tags || [];
                },
                mapGetResponse = function (data) {
                    var rowData = angular.fromJson(data),
                        mappedData = {};
                    mappedData = new RecordModel(rowData.data);
                    rowData.data = mappedData;
                    return rowData;
                },
                mapQueryResponse = function (data) {
                    var rowData = angular.fromJson(data),
                        mappedData = [];
                    if (angular.isArray(rowData.data)) {
                        angular.forEach(rowData.data, function (item) {
                            mappedData.push(new RecordModel(item));
                        });
                        rowData.data = mappedData;
                    }
                    return rowData;
                },
                query = function () {
                    return $http({
                        method: 'GET',
                        url: 'api/list',
                        params: {},
                        data: {},
                        transformResponse: mapQueryResponse,
                        cache: true
                    });
                },
                get = function (id) {
                    return $http({
                        method: 'GET',
                        url: 'api/record/' + id,
                        params: {},
                        data: {},
                        transformResponse: mapGetResponse,
                        cache: true
                    });
                },
                save = function (record) {
                    var id = record._id,
                        url = id ? 'api/record/' + id : 'api/record';
                    return $http({
                        method: 'POST',
                        url: url,
                        params: {},
                        data: record,
                        transformResponse: mapGetResponse,
                        cache: false
                    })
                        .then(function (response) {
                            // reset default cache
                            var cache = $cacheFactory.get('$http');
                            cache.removeAll();
                        });
                },
                remove = function (record) {
                    var id = record._id,
                        url = 'api/record/' + id;
                    return $http({
                        method: 'DELETE',
                        url: url,
                        cache: false
                    })
                        .then(function (response) {
                            // reset default cache
                            var cache = $cacheFactory.get('$http');
                            cache.removeAll();
                        });
                };

            return{
                provider: {
                    query: query,
                    get: get,
                    save: save,
                    remove: remove
                },
                RecordModel: RecordModel
            };
        }
    ]);
