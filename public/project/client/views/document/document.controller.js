(function () {
    "use strict";

    var DEFINE_URL = "https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&callback=JSON_CALLBACK&phrase=";

    angular
        .module("DocumentCallaborationApp")
        .controller("DocumentController", DocumentController);

    function DocumentController($scope, $rootScope, $location, $http, $routeParams, UserService, DocumentService,
                                CommentService) {
        var model = this;

        model.discardDocument = discardDocument;
        model.deleteDocument = deleteDocument;
        model.editDocument = editDocument;
        model.saveDocument = saveDocument;
        model.clearError = clearError;
        model.expandAllLikers = expandAllLikers;
        model.rateDocument = rateDocument;
        model.editComment = editComment;
        model.saveComment = saveComment;
        model.deleteComment = deleteComment;
        model.addNewComment = addNewComment;
        model.getSelectedText = getSelectedText;
        model.discardComment = discardComment;

        $scope.showDefinition = false;
        $scope.createComment = createComment;

        function init() {
            $rootScope.newDocument = true;
            if ($routeParams.documentId) {
                $rootScope.document = null;
                DocumentService.getDocumentById($routeParams.documentId)
                    .then(function (response) {
                        $rootScope.document = response.data;
                        if ($rootScope.document) {
                            $rootScope.editable = false;
                            $rootScope.newDocument = false;
                        }
                        initializeDocument();
                    });
            }
        }

        init();

        function initializeDocument() {
            if ($rootScope.user && $rootScope.document) {
                if (!$rootScope.user.firstName || !$rootScope.user.lastName) {
                    $location.url("/profile");
                } else if ($rootScope.newDocument) {
                    //console.log("There is nothing to do");
                } else {
                    var dd = new Date($rootScope.document.lastModified);
                    var dispDate = (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear();
                    $rootScope.editable = false;
                    UserService.findUserById($rootScope.document.userId)
                        .then(function (response) {
                            var user = response.data;
                            if (!!user) {
                                if (user._id == $rootScope.user._id) {
                                    $rootScope.document.user = "you";
                                } else {
                                    $rootScope.document.user = user.firstName + " " + user.lastName;
                                }
                            }
                            $rootScope.document.lastModifiedDate = dispDate;
                            model.title = $rootScope.document.title;
                            model.content = $rootScope.document.content;
                            getLikeInformation();
                            getComments();
                        });
                }
            } else {
                $location.path("/home");
            }
        }

        function editDocument() {
            $rootScope.editable = true;
        }

        function discardDocument() {
            clearError();
            if ($rootScope.editable) {
                model.title = $rootScope.document.title;
                model.content = $rootScope.document.content;
                $rootScope.editable = false;
            } else if ($rootScope.newDocument) {
                $location.path("/home");
            }
        }

        function saveDocument() {
            if (($rootScope.editable && !model.title) || ($rootScope.newDocument && !model.newDocumentTitle)) {
                model.errorred = true;
                model.errorMessage = "Title required for document";
                return;
            }
            clearError();
            var dd = new Date();
            var newDocument = {"userId": $rootScope.user._id, "lastModified": dd.toJSON()};
            if ($rootScope.editable) {
                newDocument.title = model.title;
                newDocument.content = model.content;
                newDocument.like = $rootScope.document.like;
                newDocument.comment = $rootScope.document.comment;
                DocumentService.updateDocumentById($rootScope.document._id, newDocument)
                    .then(function (response) {
                        $rootScope.document = response.data;
                        $rootScope.editable = false;
                        gatherUserModifier(dd);
                    });
            } else if ($rootScope.newDocument) {
                newDocument.title = model.newDocumentTitle;
                newDocument.content = model.newDocumentContent;
                newDocument.like = [];
                newDocument.comment = [];
                DocumentService.addNewDocument(newDocument)
                    .then(function (response) {
                        $rootScope.document = response.data;
                        $rootScope.newDocument = false;
                        gatherUserModifier(dd);
                    });
            }
        }

        function gatherUserModifier(dd) {
            UserService.findUserById($rootScope.document.userId)
                .then(function (response) {
                    var user = response.data;
                    if (!!user) {
                        if (user._id == $rootScope.user._id) {
                            $rootScope.document.user = "you";
                        } else {
                            $rootScope.document.user = user.firstName + " " + user.lastName;
                        }
                    }
                    $rootScope.document.lastModifiedDate = (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear();
                    model.title = $rootScope.document.title;
                    model.content = $rootScope.document.content;
                    getLikeInformation();
                    getComments();
                    $location.path("/document/" + $rootScope.document._id);
                });
        }

        function clearError() {
            model.errorred = false;
            model.errorMessage = "";
        }

        function getSelectedText() {
            model.selectedText = "";
            if (window.getSelection) {
                model.selectedText = window.getSelection().toString().trim();
            } else if (document.selection && document.selection.type != "Control") {
                model.selectedText = document.selection.createRange().text.trim();
            }
            if (model.selectedText) {
                var defineUrl = DEFINE_URL + model.selectedText.toLowerCase();
                $http.jsonp(defineUrl)
                    .success(renderDefinition);
            }
        }

        function renderDefinition(response) {
            model.definition = {
                "modelTitle": "Definitions for \"" + model.selectedText + "\"",
                "definitions": "No definitions found"
            };
            if (response) {
                if (response.tuc) {
                    var tl = response.tuc.length;
                    if (tl > 0) {
                        model.definition.definitions = "";
                        var fl = response.tuc[0].meanings.length;
                        for (var idx = 0; idx < fl; idx++) {
                            if (idx >= 3) {
                                break;
                            }
                            model.definition.definitions +=
                                ("(" + (idx + 1) + ") " + response.tuc[0].meanings[idx].text + " ");
                        }
                        if (fl < 3) {
                            if (tl > (3 - fl)) {
                                tl = 3 - fl;
                            }
                            for (var idx = 0; idx < tl; idx++) {
                                model.definition.definitions +=
                                    "(" + (fl + idx + 1) + ") " + response.tuc[idx].meanings[0].text + " ";
                            }
                        }
                    }
                }
            }
            $scope.showDefinition = true;
        }

        function deleteDocument() {
            DocumentService.deleteDocumentById($rootScope.document._id)
                .then(function (response) {
                    if (response.data) {
                        $rootScope.document = null;
                        $location.url("/home");
                    }
                });
        }

        function getLikeInformation() {
            var like = $rootScope.document.like;
            model.likeMessage = "";
            model.youLike = false;
            model.showAll = true;
            if (like && like.length > 0) {
                var youIdx = like.indexOf($rootScope.user._id);
                if (youIdx >= 0) {
                    model.youLike = true;
                    model.likeMessage = model.likeMessage + "You ";
                    addMoreThan2(like, youIdx);
                } else {
                    UserService.findUserById(like[0])
                        .then(function (response) {
                            var user = response.data;
                            if (user) {
                                model.likeMessage = model.likeMessage + user.firstName + " " + user.lastName + " ";
                                addMoreThan2(like, -1);
                            }
                        });
                }
            }
        }

        function addMoreThan2(like, youIdx) {
            if (like.length === 2) {
                var Udx = 1;
                if (youIdx >= 0) {
                    if (youIdx === 1) {
                        Udx = 0;
                    }
                }
                UserService.findUserById(like[Udx])
                    .then(function (response) {
                        var user = response.data;
                        model.likeMessage = model.likeMessage + "and " + user.firstName + " " + user.lastName + " ";
                        addToLike(like.length, youIdx);
                    });
            } else if (like.length > 2) {
                model.likeMessage = model.likeMessage + "and " + (like.length - 1) + " others ";
                model.showAll = false;
                addToLike(like.length, youIdx);
            } else {
                addToLike(like.length, youIdx);
            }
        }

        function addToLike(numberOfLikes, youIdx) {
            if (numberOfLikes == 1 && youIdx < 0) {
                model.likeMessage = model.likeMessage + "likes this";
            } else {
                model.likeMessage = model.likeMessage + "like this";
            }
        }

        function expandAllLikers() {
            var like = $rootScope.document.like;
            expandThatLiker(like, 0);
        }

        function expandThatLiker(like, idx) {
            if (idx >= like.length) {
                if (like.length == 1) {
                    model.likeMessage = model.likeMessage + " likes this";
                } else {
                    model.likeMessage = model.likeMessage + " like this";
                }
                model.showAll = true;
                return;
            }
            UserService.findUserById(like[idx])
                .then(function (response) {
                    var user = response.data;
                    if (idx === 0) {
                        model.likeMessage = user.firstName + " " + user.lastName;
                    } else if (idx == (like.length - 1)) {
                        model.likeMessage = model.likeMessage + " and " + user.firstName + " " + user.lastName;
                    } else {
                        model.likeMessage = model.likeMessage + ", " + user.firstName + " " + user.lastName;
                    }
                    expandThatLiker(like, idx + 1);
                });
        }

        function rateDocument(liked) {
            DocumentService.rateDocument($rootScope.document._id, $rootScope.user._id, liked)
                .then(function (response) {
                    $rootScope.document.like = response.data;
                    if (!liked) {
                        model.youLike = false;
                    }
                    UserService.updateLikeByUserId($rootScope.user._id, $rootScope.document._id, liked)
                        .then(function (response) {
                            $rootScope.user.likes = response.data;
                            getLikeInformation();
                        });
                });
        }

        function getComments() {
            model.comments = [];
            DocumentService.getCommentsOnDocument($rootScope.document._id)
                .then(function (response) {
                    model.comments = response.data;
                });
        }

        function editComment($index) {
            model.commentEditingContent = model.comments[$index].content;
            model.editCommentIndex = $index;
        }

        function saveComment() {
            model.comments[model.editCommentIndex].content = model.commentEditingContent;
            CommentService.updateComment($rootScope.document._id, model.comments[model.editCommentIndex]._id,
                model.comments[model.editCommentIndex])
                .then(function (response) {
                    var comment = response.data;
                    var dd = new Date(comment.lastModified);
                    model.comments[model.editCommentIndex].commentDate = (dd.getMonth() + 1)
                        + "/" + dd.getDate() + "/" + dd.getFullYear();
                    var removedComment = model.comments.splice(model.editCommentIndex, 1);
                    model.comments.push(removedComment[0]);
                    model.editCommentIndex = -1;
                });
        }

        function discardComment() {
            model.commentEditingContent = "";
            model.editCommentIndex = -1;
        }

        function stillCommentedOn(comments, userId) {
            for (var c in comments) {
                if (comments[c].userId == userId) {
                    return true;
                }
            }
            return false;
        }

        function deleteComment($index) {
            DocumentService.deleteCommentIdFromDocumentId(model.comments[$index]._id, $rootScope.document._id)
                .then(function (response) {
                    var newComments = response.data;
                    var userId = model.comments[$index].userId;
                    model.comments.splice($index, 1);
                    if (!stillCommentedOn(newComments, userId)) {
                        UserService.removeCommentedOnIdByUserId($rootScope.user._id, $rootScope.document._id)
                            .then(function (response) {
                                $rootScope.user.commentedOn = response.data;
                            });
                    }
                });
        }

        function createComment() {
            $scope.createNewComment();
        }

        function addNewComment() {
            if (!model.newCommentContent) {
                return;
            }
            var newComment = {
                "userId": $rootScope.user._id,
                "userName": $rootScope.user.firstName + " " + $rootScope.user.lastName,
                "content": model.newCommentContent
            };
            CommentService.addComment($rootScope.document._id, newComment)
                .then(function (response) {
                    var comment = response.data;
                    var dd = new Date(comment.lastModified);
                    model.comments.push({
                        "_id": comment._id,
                        "userId": comment.userId,
                        "userName": "You",
                        "content": comment.content,
                        "commentDate": (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear()
                    });
                    UserService.addCommentedOnByUserId($rootScope.user._id, $rootScope.document._id)
                        .then(function (response) {
                            $rootScope.user.commentedOn = response.data;
                            model.newCommentContent = "";
                        });
                });
        }
    }
}());
