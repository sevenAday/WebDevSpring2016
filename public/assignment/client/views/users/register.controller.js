(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            model.showError = true;
            delete $scope.registration.verifyPassword.$error.notMatching;
            delete $scope.registration.username.$error.duplicateUsername;
            if (model.password !== model.verifyPassword) {
                $scope.registration.verifyPassword.$error = {"notMatching": true};
            }
            if (isNotEmpty($scope.registration.username.$error)
                || isNotEmpty($scope.registration.password.$error)
                || isNotEmpty($scope.registration.verifyPassword.$error)
                || isNotEmpty($scope.registration.inputEmail.$error)) {
                return;
            }
            UserService.findUserByUsername(model.username)
                .then(function (response) {
                    if (response.data) {
                        $scope.registration.username.$error = {"duplicateUsername": true};
                    } else {
                        var newUser = {
                            "username": model.username,
                            "password": model.password,
                            "email": model.email
                        };
                        UserService.createUser(newUser)
                            .then(function (response) {
                                var users = response.data;
                                $rootScope.user = users[users.length - 1];
                                $location.path("/profile");
                            });
                    }
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
