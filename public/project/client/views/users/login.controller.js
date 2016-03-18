(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login() {
            model.showError = true;
            delete model.signin.password.$error.invalidLogin;
            if (!isNotEmpty(model.signin.username.$error) && !isNotEmpty(model.signin.password.$error)) {
                UserService.findUserByCredentials(model.username, model.password)
                    .then(function (response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            if (!!$rootScope.user) {
                                if ($rootScope.user.roles.indexOf("admin") != -1) {
                                    $rootScope.isAdmin = true;
                                }
                                if ($rootScope.document) {
                                    $location.path("/document/" + $rootScope.document._id);
                                } else if ($rootScope.isAdmin) {
                                    $location.path("/admin");
                                } else {
                                    $location.path("/profile");
                                }
                            } else {
                                model.signin.password.$error = {"invalidLogin": true};
                            }
                        }
                    });
            }
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
