(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService, DocumentService) {
        var model = this;

        model.update = update;
        model.clearMessage = clearMessage;
        model.openDocument = openDocument;

        function init() {
            if ($rootScope.user) {
                model.username = $rootScope.user.username;
                model.password = $rootScope.user.password;
                model.firstName = $rootScope.user.firstName;
                model.lastName = $rootScope.user.lastName;
                model.email = $rootScope.user.email;
                model.documents = [];
                model.likedDocuments = [];
                model.documentsCommentedOn = [];
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
                        model.documents.push(newDocument);
                    });

                    model.documents.sort(function (x, y) {
                        var xDate = x.lastModified;
                        var yDate = y.lastModified;
                        return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                    });

                    if ($rootScope.numberOfActivities < model.documents.length) {
                        model.documents.splice($rootScope.numberOfActivities,
                            model.documents.length - $rootScope.numberOfActivities);
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
                        model.likedDocuments.push(newDocument);
                    });

                    model.likedDocuments.sort(function (x, y) {
                        var xDate = x.lastModified;
                        var yDate = y.lastModified;
                        return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                    });

                    if ($rootScope.numberOfActivities < model.likedDocuments.length) {
                        model.likedDocuments.splice($rootScope.numberOfActivities,
                            model.likedDocuments.length - $rootScope.numberOfActivities);
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
                            model.documentsCommentedOn.push(newDocument);
                        });
                    });

                    model.documentsCommentedOn.sort(function (x, y) {
                        var xDate = x.lastModified;
                        var yDate = y.lastModified;
                        return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                    });

                    if ($rootScope.numberOfActivities < model.documentsCommentedOn.length) {
                        model.documentsCommentedOn.splice($rootScope.numberOfActivities,
                            model.documentsCommentedOn.length - $rootScope.numberOfActivities);
                    }
                }
            } else {
                $location.path("/login");
            }
        }

        init();

        function openDocument(documentType, $index) {
            if (documentType == 1) {
                $rootScope.document = model.likedDocuments[$index];
            } else if (documentType == 2) {
                $rootScope.document = model.documentsCommentedOn[$index];
            } else {
                $rootScope.document = model.documents[$index];
            }
            $rootScope.newDocument = false;
            $rootScope.editable = false;
            $location.path("/document/" + $rootScope.document._id);
        }

        function update() {
            model.successful = false;
            var currentUser = null;
            model.showError = true;
            if (isNotEmpty(model.profile.username.$error)
                || isNotEmpty(model.profile.password.$error)
                || isNotEmpty(model.profile.lastName.$error)
                || isNotEmpty(model.profile.firstName.$error)
                || isNotEmpty(model.profile.inputEmail.$error)) {
                return;
            }
            currentUser = {
                "username": model.username,
                "password": model.password,
                "firstName": model.firstName,
                "lastName": model.lastName,
                "email": model.email
            };
            UserService.updateUser($rootScope.user._id, currentUser)
                .then(function (response) {
                    var user = response.data;
                    $rootScope.user.username = user.username;
                    $rootScope.user.password = user.password;
                    $rootScope.user.firstName = user.firstName;
                    $rootScope.user.lastName = user.lastName;
                    $rootScope.user.email = user.email;
                    $rootScope.user.roles = user.roles;
                    model.successful = true;
                    $location.path("/profile");
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }

        function clearMessage() {
            model.successful = false;
        }
    }
}());
