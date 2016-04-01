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
                        var emails = [];
                        if (model.email) {
                            emails.push(model.email);
                        }
                        var newUser = {
                            "username": model.username,
                            "password": model.password,
                            "emails": emails
                        };
                        UserService.createUser(newUser)
                            .then(function (response) {
                                var users = response.data;
                                UserService.setCurrentUser(users[users.length - 1]);
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
