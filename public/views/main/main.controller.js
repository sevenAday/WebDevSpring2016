(function () {
    "use strict";

    angular
        .module("HomePageApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
}());

