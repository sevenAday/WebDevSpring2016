(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login() {
            model.showError = true;
            delete $scope.signin.password.$error.invalidLogin;
            if (!isNotEmpty($scope.signin.username.$error) && !isNotEmpty($scope.signin.password.$error)) {
                UserService.findUserByCredentials(model.username, model.password)
                    .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        if (!!$rootScope.user) {
                            var userRoles = $rootScope.user.roles.map(function (role) {
                                return role.toLowerCase();
                            });
                            if (userRoles.indexOf("admin") >= 0 || userRoles.indexOf("administrator") >= 0) {
                                $rootScope.isAdmin = true;
                            }
                            $location.path("/profile");
                        } else {
                            $scope.signin.password.$error = {"invalidLogin": true};
                        }
                    });
            }
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
