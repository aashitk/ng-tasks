var mainDirectives = angular.module('mainDirectives', []);

mainDirectives.directive('mainUserForm', function() {
    return {
        restrict: 'E',
        required: 'ngModel',
        replace: true,
        templateUrl: 'common/partials/main-user-form.html'
    };
});
