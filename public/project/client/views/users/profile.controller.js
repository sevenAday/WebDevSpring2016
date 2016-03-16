(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService, DocumentService) {
        $scope.$location = $location;
        if ($rootScope.user) {
            $scope.username = $rootScope.user.username;
            $scope.password = $rootScope.user.password;
            $scope.firstName = $rootScope.user.firstName;
            $scope.lastName = $rootScope.user.lastName;
            $scope.email = $rootScope.user.email;
            $scope.documents = [];
            $scope.likedDocuments = [];
            $scope.documentsCommentedOn = [];
            DocumentService.getDocumentsModifiedByUserId($rootScope.user._id, function (documents) {
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

                $scope.documents.sort(function (x, y) {
                    var xDate = x.lastModified;
                    var yDate = y.lastModified;
                    return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                });

                if ($rootScope.numberOfActivities < $scope.documents.length) {
                    $scope.documents.splice($rootScope.numberOfActivities,
                        $scope.documents.length - $rootScope.numberOfActivities);
                }
            });

            DocumentService.getDocumentsLikedByUserId($rootScope.user._id, function (documents) {
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
                    $scope.likedDocuments.push(newDocument);
                });

                $scope.likedDocuments.sort(function (x, y) {
                    var xDate = x.lastModified;
                    var yDate = y.lastModified;
                    return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                });

                if ($rootScope.numberOfActivities < $scope.likedDocuments.length) {
                    $scope.likedDocuments.splice($rootScope.numberOfActivities,
                        $scope.likedDocuments.length - $rootScope.numberOfActivities);
                }
            });

            if ($rootScope.user.commentedOn) {
                $rootScope.user.commentedOn.forEach(function (documentId) {
                   DocumentService.getDocumentById(documentId, function (document) {
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
                       $scope.documentsCommentedOn.push(newDocument);
                   });
                });

                $scope.documentsCommentedOn.sort(function (x, y) {
                    var xDate = x.lastModified;
                    var yDate = y.lastModified;
                    return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                });

                if ($rootScope.numberOfActivities < $scope.documentsCommentedOn.length) {
                    $scope.documentsCommentedOn.splice($rootScope.numberOfActivities,
                        $scope.documentsCommentedOn.length - $rootScope.numberOfActivities);
                }
            }
        } else {
            $location.path("/login");
        }

        $scope.update = update;
        $scope.clearMessage = clearMessage;
        $scope.openDocument = openDocument;

        function openDocument(documentType, $index) {
            if (documentType == 1) {
                $rootScope.document = $scope.likedDocuments[$index];
            } else if (documentType == 2) {
                $rootScope.document = $scope.documentsCommentedOn[$index];
            } else {
                $rootScope.document = $scope.documents[$index];
            }
            $rootScope.newDocument = false;
            $rootScope.editable = false;
            $location.path("/document/" + $rootScope.document._id);
        }

        function update() {
            $scope.successful = false;
            var currentUser = null;
            $scope.showError = true;
            if (isNotEmpty($scope.profile.username.$error)
                || isNotEmpty($scope.profile.password.$error)
                || isNotEmpty($scope.profile.lastName.$error)
                || isNotEmpty($scope.profile.firstName.$error)
                || isNotEmpty($scope.profile.inputEmail.$error)) {
                return;
            }
            currentUser = {
                "username": $scope.username,
                "password": $scope.password,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "email": $scope.email
            };
            UserService.updateUser($rootScope.user._id, currentUser, function (user) {
                $rootScope.user.username = user.username;
                $rootScope.user.password = user.password;
                $rootScope.user.firstName = user.firstName;
                $rootScope.user.lastName = user.lastName;
                $rootScope.user.email = user.email;
                $rootScope.user.roles = user.roles;
            });
            $scope.successful = true;
            $location.path("/profile");
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }

        function clearMessage() {
            $scope.successful = false;
        }
    }
}());
