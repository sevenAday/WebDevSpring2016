(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            $scope.showError = true;
            delete $scope.signin.password.$error.invalidLogin;
            if (!isNotEmpty($scope.signin.username.$error) && !isNotEmpty($scope.signin.password.$error)) {
                UserService.findUserByCredentials($scope.username, $scope.password)
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
                                $scope.signin.password.$error = {"invalidLogin": true};
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