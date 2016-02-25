(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("DocumentController", DocumentController);

    function DocumentController($scope, $rootScope, $location, UserService, DocumentService) {
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
        $scope.saveDocument = saveDocument;
        $scope.clearError = clearError;

        function editDocument() {
            $rootScope.editable = true;
        }

        function discardDocument() {
            clearError();
            if ($rootScope.editable) {
                $rootScope.editable = false;
            } else if ($rootScope.newDocument) {
                $location.path("/home");
            }
        }

        function saveDocument() {
            if (($rootScope.editable && !$scope.title) || ($rootScope.newDocument && !$scope.newDocumentTitle)) {
                $scope.errorred = true;
                $scope.errorMessage = "Title required for document";
                return;
            }
            clearError();
            var newDocument = {"userId": $rootScope.user._id, "lastModified": new Date()};
            var dd = newDocument.lastModified;
            if ($rootScope.editable) {
                newDocument.title = $scope.title;
                newDocument.content = $scope.content;
                DocumentService.updateDocumentById($rootScope.document._id, newDocument, function (document) {
                    $rootScope.document = document;
                });
                $rootScope.editable = false;
            } else if ($rootScope.newDocument) {
                newDocument.title = $scope.newDocumentTitle;
                newDocument.content = $scope.newDocumentContent;
                DocumentService.addNewDocument(newDocument, function (document) {
                    $rootScope.document = document;
                });
                $rootScope.newDocument = false;
            }
            UserService.findUserById($rootScope.document.userId, function (user) {
                if (!!user) {
                    $rootScope.document.user = user.firstName + " " + user.lastName;
                }
            });
            $rootScope.document.lastModifiedDate = dd.getMonth() + "/" + dd.getDate() + "/" + dd.getFullYear();
            $scope.title = $rootScope.document.title;
            $scope.content = $rootScope.document.content;
        }

        function clearError() {
            $scope.errorred = false;
            $scope.errorMessage = "";
        }
    }
}());
