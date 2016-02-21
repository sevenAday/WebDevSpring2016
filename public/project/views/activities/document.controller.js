(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("DocumentController", DocumentController);

    function DocumentController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        var dd = $rootScope.document.lastModified;
        $scope.editable = false;
        UserService.findUserById($rootScope.document.userId, function (user) {
            if (!!user) {
                $rootScope.document.user = user.firstName + " " + user.lastName;
            }
        });
        $rootScope.document.lastModifiedDate = dd.getMonth() + "/" + dd.getDate() + "/" + dd.getFullYear();
        $scope.title = $rootScope.document.title;
        $scope.content = $rootScope.document.content;

        $scope.editDocument = editDocument;

        function editDocument() {
            $scope.editable = true;
        }
    }
}());
