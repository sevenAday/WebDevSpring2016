(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.register = register;

        function register() {
            var newUser = null;
            $scope.showError = true;
            delete $scope.registration.verifyPassword.$error.notMatching;
            if ($scope.password !== $scope.verifyPassword) {
                $scope.registration.verifyPassword.$error = {"notMatching": true};
            }
            if (isNotEmpty($scope.registration.username.$error)
                || isNotEmpty($scope.registration.password.$error)
                || isNotEmpty($scope.registration.verifyPassword.$error)
                || isNotEmpty($scope.registration.inputEmail.$error)) {
                return;
            }
            newUser = {
                "username": $scope.username,
                "password": $scope.password,
                "email": $scope.email,
                "roles": ["Not specified"],
                "commentedOn": []
            };
            UserService.createUser(newUser, function (user) {
                $rootScope.user = user;
            });
            $location.path("/profile");
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
