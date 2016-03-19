(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            var newUser = null;
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
                        newUser = {
                            "username": model.username,
                            "password": model.password,
                            "email": model.email,
                            "roles": ["Not specified"],
                            "commentedOn": []
                        };
                        UserService.createUser(newUser)
                            .then(function (response) {
                                UserService.setCurrentUser(response.data);
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
