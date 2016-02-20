(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        if ($rootScope.user && $rootScope.isAdmin) {
            UserService.findAllUsers(function (users) {
                $scope.users = [];
                for (var idx = 0; idx < users.length; idx++) {
                    $scope.users[idx] = {
                        "username": users[idx].username,
                        "password": users[idx].password,
                        "roles": users[idx].roles.join(" | ")
                    };
                }

            });
        }
    }
}());
