(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
}());
