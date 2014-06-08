/**
 * Created by mgordeev on 03.06.2014.
 */
angular.module('artbookApp',
    [
        'ngRoute',
        'artbookControllers',
        'artbookRoutes'
    ])
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
        }
    });

