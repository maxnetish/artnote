/**
 * Created by mgordeev on 03.06.2014.
 */
/* config moment: */
(function () {
    var langCode = window.navigator.userLanguage || window.navigator.language;
    moment.lang(langCode);
})();

angular.module('artbookApp',
    [
        'ngRoute',
        'ngSanitize',
        'pascalprecht.translate',
        'artbookControllers',
        'artbookRoutes'
    ])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useUrlLoader('api/locale');
        $translateProvider.determinePreferredLanguage();
    }])
    .directive("artTagEditor", function () {
        return{
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                ngModel.$parsers.unshift(
                    function (viewValue) {
                        var tagsArray = viewValue.split(' ');
                        return tagsArray;
                    });
                ngModel.$formatters.unshift(function (v) {
                    var formatted = '';
                    angular.forEach(v, function (item) {
                        if (formatted.length) {
                            formatted = formatted + ' ' + item;
                        } else {
                            formatted = item;
                        }
                    });
                    return formatted;
                });
            }
        };
    })
    .directive("artDateEditor", function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                ngModel.$parsers.unshift(
                    function (viewValue) {
                        var date = new Date(viewValue);
                        if (isNaN(date.getTime())) {
                            // invalid date:
                            ngModel.$setValidity('artDate', false);
                            return null;
                        }
                        ngModel.$setValidity('artDate', true);
                        return date;
                    });
                ngModel.$formatters.unshift(function (v) {
                    var formatted = $filter('date')(v, 'yyyy-MM-dd');
                    return formatted;
                });
            }
        };
    })
    .filter('artdate', function () {
        return function (input) {
            // input will be Date
            if (angular.isDate(input)) {

                return moment(input).format('LL');
            } else {
                return input;
            }
        };
    });

