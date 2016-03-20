(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
}());
