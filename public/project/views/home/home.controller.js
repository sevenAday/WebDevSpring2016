(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, DocumentService) {
        $scope.$location = $location;
        $scope.documents = [];
        DocumentService.getAllDocuments(function (documents) {
            documents.forEach(function (document) {
                var newDocument = {
                    "_id": document._id,
                    "userId": document.userId,
                    "title": document.title,
                    "content": document.content,
                    "abstract": document.content.substring(0, 160),
                    "lastModified": document.lastModified
                };
                $scope.documents.push(newDocument);
            });
        });

        $scope.openDocument = openDocument;

        function openDocument($index) {
            $rootScope.document = $scope.documents[$index];
            if ($rootScope.user) {
                $rootScope.newDocument = false;
                $rootScope.editable = false;
                $location.path("/document");
            } else {
                $location.path("/login");
            }
        }
    }
}());
