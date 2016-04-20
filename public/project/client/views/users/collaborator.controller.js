(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("CollaboratorController", CollaboratorController);

    function CollaboratorController($location, $routeParams, $sce, $rootScope, UserService, DocumentService) {
        var model = this;

        model.openDocument = openDocument;

        function init() {
            model.userId = $routeParams.userId;
            if (model.userId) {
                UserService.findUserById(model.userId)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            model.username = user.username;
                            model.firstName = user.firstName;
                            model.lastName = user.lastName;
                            model.email = user.email;
                            model.profileImage = $sce.trustAsResourceUrl(user.profileImage);
                            model.commentedOn = user.commentedOn;
                            model.documents = [];
                            model.likedDocuments = [];
                            model.documentsCommentedOn = [];
                            DocumentService.getDocumentsModifiedByUserId(model.userId)
                                .then(function (response) {
                                    var foundDocuments = response.data;
                                    foundDocuments.forEach(function (document) {
                                        var asbtractStr;
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

                                    getDocumentsLikedByUserIdNext();
                                });
                        }
                    });
            } else {
                $location.path("/login");
            }
        }

        init();

        function getDocumentsLikedByUserIdNext() {
            UserService.getLikeByUserId(model.userId)
                .then(function (response) {
                    response.data.forEach(function (document) {
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

                    getCommentedOnNext();
                });
        }

        function getCommentedOnNext() {
            if (model.commentedOn) {
                UserService.getCommentedOnByUserId(model.userId)
                    .then(function (response) {
                        response.data.forEach(function (document) {
                            var abstractStr = "";
                            if (document.content) {
                                abstractStr = document.content.substring(0, 160);
                            }
                            var newDocument = {
                                "_id": document._id,
                                "userId": document.userId,
                                "title": document.title,
                                "content": document.content,
                                "abstract": abstractStr,
                                "lastModified": document.lastModified,
                                "like": document.like,
                                "comment": document.comment
                            };
                            model.documentsCommentedOn.push(newDocument);
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
                    });
            }
        }

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
    }
}());
