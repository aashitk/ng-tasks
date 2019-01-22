var matrixCtrls = angular.module('matrixControllers', ['ngRoute', 'ngAnimate', 'ngSanitize']);

matrixCtrls.controller('MatrixCtrl', ['$scope', '$state', '$window', function($scope, $state, $window) {
    $scope.matrixObject = {};
}]);