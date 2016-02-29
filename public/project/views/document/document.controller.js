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
                // There is nothing to do
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
                getLikeInformation();
            }
        } else {
            $location.path("/home");
        }

        $scope.discardDocument = discardDocument;
        $scope.deleteDocument = deleteDocument;
        $scope.editDocument = editDocument;
        $scope.saveDocument = saveDocument;
        $scope.clearError = clearError;
        $scope.getSelectedText = getSelectedText;
        $scope.expandAllLikers = expandAllLikers;
        $scope.rateDocument = rateDocument;

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
                newDocument.like = $rootScope.document.like;
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
            getLikeInformation();
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
            console.log(response);
            $scope.definition = "No definitions found";
            if (response) {
                if (response.tuc) {
                    if (response.tuc.length > 0){
                        $scope.definition = response.tuc[0].meanings[0];
                    }
                }
            }
            $scope.$broadcast("toggleDialog", $scope.definition);
        }

        function deleteDocument() {
            DocumentService.deleteDocumentById($rootScope.document._id);
            $rootScope.document = null;
            $location.url("/home");
        }

        function getLikeInformation() {
            var like = $rootScope.document.like;
            $scope.likeMessage = "";
            $scope.youLike = false;
            $scope.showAll = true;
            if (like && like.length > 0) {
                var youIdx = like.indexOf($rootScope.user._id);
                if (youIdx >= 0) {
                    $scope.youLike = true;
                    $scope.likeMessage = $scope.likeMessage + "You ";
                } else {
                    UserService.findUserById(like[0], function (user) {
                        $scope.likeMessage = $scope.likeMessage + user.firstName + " " + user.lastName + " ";
                    });
                }
                if (like.length === 2) {
                    var Udx = 1;
                    if (youIdx >= 0) {
                        if (youIdx === 1) {
                            Udx = 0;
                        }
                    }
                    UserService.findUserById(like[Udx], function (user) {
                        $scope.likeMessage = $scope.likeMessage + "and " + user.firstName + " " + user.lastName + " ";
                    });
                } else if (like.length > 2) {
                    $scope.likeMessage = $scope.likeMessage + "and " + (like.length - 1) + " others ";
                    $scope.showAll = false;
                }
                if (like.length == 1 && youIdx < 0) {
                    $scope.likeMessage = $scope.likeMessage + "likes this";
                } else {
                    $scope.likeMessage = $scope.likeMessage + "like this";
                }
            }
        }

        function expandAllLikers() {
            var like = $rootScope.document.like;
            for (var idx = 0; idx < like.length; idx++) {
                UserService.findUserById(like[idx], function (user) {
                    if (idx === 0) {
                        $scope.likeMessage = user.firstName + " " + user.lastName;
                    } else if (idx == (like.length - 1)) {
                        $scope.likeMessage = $scope.likeMessage + " and " + user.firstName + " " + user.lastName;
                    } else {
                        $scope.likeMessage = $scope.likeMessage + ", " + user.firstName + " " + user.lastName;
                    }
                });
            }
            if (like.length == 1) {
                $scope.likeMessage = $scope.likeMessage + " likes this";
            } else {
                $scope.likeMessage = $scope.likeMessage + " like this";
            }
            $scope.showAll = true;
        }

        function rateDocument(liked) {
            DocumentService.rateDocument($rootScope.document._id, $rootScope.user._id, liked, function (like) {
                $rootScope.document.like = like;
                if (!liked) {
                    $scope.youLike = false;
                }
            });
            getLikeInformation();
        }
    }
}());
