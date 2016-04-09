(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            model.showError = true;
            model.disableRegisterButton = true;
            delete $scope.registration.verifyPassword.$error.notMatching;
            delete $scope.registration.username.$error.duplicateUsername;
            if (model.password !== model.verifyPassword) {
                $scope.registration.verifyPassword.$error = {"notMatching": true};
            }
            if (isNotEmpty($scope.registration.username.$error)
                || isNotEmpty($scope.registration.password.$error)
                || isNotEmpty($scope.registration.verifyPassword.$error)
                || isNotEmpty($scope.registration.inputEmail.$error)) {
                model.disableRegisterButton = false;
                return;
            }
            var validRegExp = /^[\w]{2,}$/;
            if (model.password.search(validRegExp) === -1) {
                $scope.registration.password.$error = {"required": true};
                model.disableRegisterButton = false;
                return;
            }
            var newUser = {
                "username": model.username,
                "password": model.password,
                "email": model.email,
                "roles": ["Not specified"],
                "commentedOn": []
            };
            UserService.register(newUser)
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.path("/profile");
                    } else {
                        $scope.registration.username.$error = {"duplicateUsername": true};
                        model.disableRegisterButton = false;
                    }
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
