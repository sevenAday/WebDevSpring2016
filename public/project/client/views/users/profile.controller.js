(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService, DocumentService) {
        var model = this;
        var unchangedPW = null;

        model.update = update;
        model.clearMessage = clearMessage;
        model.clearPassword = clearPassword;
        model.fillPassword = fillPassword;
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
                DocumentService.getDocumentsModifiedByUserId($rootScope.user._id)
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
            } else {
                $location.path("/login");
            }
        }

        init();

        function getDocumentsLikedByUserIdNext() {
            UserService.getLikeByUserId($rootScope.user._id)
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
            if ($rootScope.user.commentedOn) {
                UserService.getCommentedOnByUserId($rootScope.user._id)
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

        function update() {
            model.successful = false;
            var currentUser;
            model.showError = true;
            delete $scope.profile.inputEmail.$error.address;
            if (isNotEmpty($scope.profile.username.$error)
                || isNotEmpty($scope.profile.password.$error)
                || isNotEmpty($scope.profile.lastName.$error)
                || isNotEmpty($scope.profile.firstName.$error)
                || isNotEmpty($scope.profile.inputEmail.$error)) {
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
                        UserService.setCurrentUser(response.data);
                        model.successful = true;
                        $location.path("/profile");
                    },
                    function (err) {
                        $scope.profile.inputEmail.$error = {"address": true};
                    });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }

        function clearMessage() {
            model.successful = false;
        }

        function clearPassword() {
            unchangedPW = model.password;
            model.password = "";
            model.successful = false;
        }

        function fillPassword() {
            if (!model.password) {
                model.password = unchangedPW;
            }
        }
    }
}());
