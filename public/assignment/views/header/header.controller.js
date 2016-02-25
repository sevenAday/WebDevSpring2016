(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.logout = logout;

        function logout() {
            delete $rootScope.user;
            delete $rootScope.isAdmin;
            $location.url("/home");
        }
    }
}());
