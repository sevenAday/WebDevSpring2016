(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.createDocument = createDocument;

        function createDocument() {
            $rootScope.document = {"newDocument": true};
            $location.path("/document");
        }
    }
}());
