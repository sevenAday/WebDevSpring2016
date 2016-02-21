(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("LogoutController", LogoutController);

    function LogoutController($scope, $rootScope, $location) {
        $scope.$location = $location;
        delete $rootScope.document;
        delete $rootScope.isAdmin;
        delete $rootScope.searching;
        delete $rootScope.user;
        $location.path("/home");
    }
}());
