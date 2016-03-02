(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("ResultsController", ResultsController);

    function ResultsController($scope, $rootScope, $location, DocumentService, $routeParams) {
        $scope.$location = $location;
        if (!$rootScope.searching) {
            $location.url("/home");
            return;
        }
        $scope.keyWord = $routeParams.keyWord;
        $scope.documents = [];
        DocumentService.getAllDocuments(function (documents) {
            documents.forEach(function (document) {
                var asbtractStr = "";
                if (document.content) {
                    asbtractStr = document.content.substring(0, 160);
                }
                var newDocument = {
                    "_id": document._id,
                    "userId": document.userId,
                    "title": document.title,
                    "content": document.content,
                    "abstract": asbtractStr,
                    "lastModified": document.lastModified,
                    "like": document.like,
                    "comment": document.comment
                };
                $scope.documents.push(newDocument);
            });
        });

        $scope.documents.sort(function (x, y) {
            var xDate = x.lastModified;
            var yDate = y.lastModified;
            return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
        });

        if ($rootScope.numberOfPages < $scope.documents.length) {
            $scope.documents.splice($rootScope.numberOfPages, $scope.documents.length - $rootScope.numberOfPages);
        }

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
