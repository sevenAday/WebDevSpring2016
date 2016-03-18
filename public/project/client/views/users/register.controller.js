(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            var newUser = null;
            model.showError = true;
            delete model.registration.verifyPassword.$error.notMatching;
            if (model.password !== model.verifyPassword) {
                model.registration.verifyPassword.$error = {"notMatching": true};
            }
            if (isNotEmpty(model.registration.username.$error)
                || isNotEmpty(model.registration.password.$error)
                || isNotEmpty(model.registration.verifyPassword.$error)
                || isNotEmpty(model.registration.inputEmail.$error)) {
                return;
            }
            newUser = {
                "username": model.username,
                "password": model.password,
                "email": model.email,
                "roles": ["Not specified"],
                "commentedOn": []
            };
            UserService.createUser(newUser)
                .then(function (user) {
                    UserService.setCurrentUser(user);
                    $location.path("/profile");
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
