(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("DocumentController", DocumentController);

    function DocumentController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        if ($rootScope.user && $rootScope.document) {
            if ($rootScope.document.newDocument) {

            } else {
                var dd = $rootScope.document.lastModified;
                $rootScope.editable = false;
                UserService.findUserById($rootScope.document.userId, function (user) {
                    if (!!user) {
                        $rootScope.document.user = user.firstName + " " + user.lastName;
                    }
                });
                $rootScope.document.lastModifiedDate = dd.getMonth() + "/" + dd.getDate() + "/" + dd.getFullYear();
                $scope.title = $rootScope.document.title;
                $scope.content = $rootScope.document.content;
            }
        } else {
            $location.path("/home");
        }

        $scope.editDocument = editDocument;
        $scope.discardDocument = discardDocument;

        function editDocument() {
            $rootScope.editable = true;
        }

        function discardDocument() {
            if ($rootScope.editable) {
                $rootScope.editable = false;
            } else if ($rootScope.newDocument) {
                $location.path("/home");
            }
        }
    }
}());
