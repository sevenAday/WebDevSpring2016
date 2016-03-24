(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
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
                            if ($rootScope.document) {
                                $location.path("/document/" + $rootScope.document._id);
                            } else if ($rootScope.isAdmin) {
                                $location.path("/admin");
                            } else {
                                $location.path("/profile");
                            }
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
