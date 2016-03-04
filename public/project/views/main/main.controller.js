(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $rootScope.numberOfPages = 10;
        $rootScope.numberOfActivities = 10;

        /*$rootScope.user = {"_id":234,
            "firstName":"Bob",
            "lastName":"Hope",
            "username":"bob",
            "password":"bob",
            "email":"bh@bo.org",
            "roles":["admin"]};
        $rootScope.isAdmin = true;*/

    }
}());
