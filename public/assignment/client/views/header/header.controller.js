(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;

        $scope.logout = logout;

        function logout() {
            UserService.logout()
                .then(function (response) {
                    if (response.status == 200) {
                        delete $rootScope.user;
                        delete $rootScope.isAdmin;
                        $location.url("/home");
                    }
                });
        }
    }
}());
