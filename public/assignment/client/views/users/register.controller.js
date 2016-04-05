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
            var emails = [];
            if (model.email) {
                emails.push(model.email);
            }
            var newUser = {
                "username": model.username,
                "password": model.password,
                "emails": emails
            };
            UserService.register(newUser)
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.path("/profile");
                    } else {
                        $scope.registration.username.$error = {"duplicateUsername": true};
                    }
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
