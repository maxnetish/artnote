/**
 * Created by mgordeev on 04.06.2014.
 */
angular.module('dataServiceModule', [])
    .service('dataService',
    [
        '$http',
        function ($http) {
            var self = this,
                records = null;

            var reloadRecords = function (callback) {
                $http({
                    method: 'GET',
                    url: 'api/list'
                })
                    .success(function (data) {
                        self.error = null;
                        records = data.data;
                        callback(data.data);
                    })
                    .error(function (data, status, headers, config) {
                        self.error = status;
                        callback(null);
                    });
            };

            this.error = null;
            this.getRecords = function (callback) {
                if (_.isArray(records)) {
                    callback(records);
                } else {
                    reloadRecords(callback);
                }
            };
            this.getRecord = function (id, callback) {
                var callbackResult = null;
                if (_.isArray(records)) {
                    callbackResult = _.find(records, function (rec) {
                        return rec._id === id;
                    });
                    callback(callbackResult);
                } else {
                    reloadRecords(function () {
                        callbackResult = _.find(records, function (rec) {
                            return rec._id === id;
                        });
                        callback(callbackResult);
                    });
                }
            };
        }
    ]);