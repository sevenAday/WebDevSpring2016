(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $rootScope.numberOfPages = 10;
        $rootScope.numberOfActivities = 10;
    }
}());
