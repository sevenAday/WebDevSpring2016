(function () {
    "use strict";

    var DEFINE_URL = "https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&callback=JSON_CALLBACK&phrase=";

    angular
        .module("DocumentCallaborationApp")
        .controller("DocumentController", DocumentController);

    function AAA(response) {
        console.log(response);
    }

    function DocumentController($scope, $rootScope, $location, $http, UserService, DocumentService) {
        $scope.$location = $location;
        if ($rootScope.user && $rootScope.document) {
            if ($rootScope.document.newDocument) {

            } else {
                var dd = $rootScope.document.lastModified;
                var dispDate = (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear();
                $rootScope.editable = false;
                UserService.findUserById($rootScope.document.userId, function (user) {
                    if (!!user) {
                        $rootScope.document.user = user.firstName + " " + user.lastName;
                    }
                });
                $rootScope.document.lastModifiedDate = dispDate;
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
        $scope.getSelectedText = getSelectedText;

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
            $rootScope.document.lastModifiedDate = (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear();
            $scope.title = $rootScope.document.title;
            $scope.content = $rootScope.document.content;
        }

        function clearError() {
            $scope.errorred = false;
            $scope.errorMessage = "";
        }

        function getSelectedText() {
            var selectedText = "";
            if (window.getSelection) {
                selectedText = window.getSelection().toString();
            } else if (document.selection && document.selection.type != "Control") {
                selectedText = document.selection.createRange().text;
            }
            if (selectedText) {
                var defineUrl = DEFINE_URL + selectedText;
                $http.jsonp(defineUrl)
                    .success(renderDefinition);
            }
        }

        function renderDefinition(response) {

        }
    }
}());
