var matrixDirectives = angular.module('matrixDirectives', []);

matrixDirectives.directive('matAttribute', function() {
    return {
        restrict: 'E',
        required: 'ngModel',
        replace: true,
        templateUrl: 'matrix-table/partials/matrix-attribute.html',
        controller: 'MatrixCtrl',
        link: function(scope, element, attrs) {
        }
    };
});
