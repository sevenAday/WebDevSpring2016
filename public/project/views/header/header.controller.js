(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
}());
