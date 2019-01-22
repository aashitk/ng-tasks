var app = angular.module('product', ['ui.router', 'mainControllers', 'mainDirectives', 'matrixControllers'
            , 'matrixDirectives']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/user-form");

    $stateProvider
    .state('UserDataForm', {
        url: '/user-form',
        templateUrl: 'common/partials/user-input-fields.html'
    })
    .state('UserMatrixData', {
        url: '/matrix-data',
        templateUrl: 'matrix-table/partials/user-matrix-data.html'
    });

    $locationProvider.hashPrefix('');
}]);