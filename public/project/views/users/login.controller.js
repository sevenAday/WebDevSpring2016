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
                UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function (user) {
                    $rootScope.user = user;
                });
                if (!!$rootScope.user) {
                    $rootScope.user.roles.forEach(function (role) {
                       if (role.indexOf("admin") != -1) {
                           $rootScope.isAdmin = true;
                       }
                    });
                    if ($rootScope.document) {
                        $location.path("/document");
                    } else {
                        $location.path("/profile");
                    }
                } else {
                    $scope.signin.password.$error = {"invalidLogin": true};
                }
            }
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
