(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $rootScope.numberOfPages = 10;
        $rootScope.numberOfActivities = 10;

        $rootScope.user = {"_id":345,
            "firstName":"Charlie",
            "lastName":"Brown",
            "username":"charlie",
            "password":"charlie",
            "email":"cb@cc.au",
            "roles":["trainer"]};
    }
}());
