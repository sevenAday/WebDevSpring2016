(function () {
    "use strict";

    var DEFINE_URL = "https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&callback=JSON_CALLBACK&phrase=";

    angular
        .module("DocumentCallaborationApp")
        .controller("DocumentController", DocumentController);

    function DocumentController($scope, $rootScope, $location, $http, $routeParams,
                                UserService, DocumentService, CommentService) {
        $scope.$location = $location;
        $rootScope.newDocument = true;
        if ($routeParams.documentId) {
            $rootScope.document = null;
            DocumentService.getDocumentById($routeParams.documentId, function (document) {
                $rootScope.document = document;
            });
            if ($rootScope.document) {
                $rootScope.editable = false;
                $rootScope.newDocument = false;
            }
        }
        if ($rootScope.user && $rootScope.document) {
            if ($rootScope.newDocument) {
                //console.log("There is nothing to do");
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
                getComments();
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
        $scope.editComment = editComment;
        $scope.saveComment = saveComment;
        $scope.deleteComment = deleteComment;
        $scope.createComment = createComment;
        $scope.addNewComment = addNewComment;

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
                newDocument.comment = $rootScope.document.comment;
                DocumentService.updateDocumentById($rootScope.document._id, newDocument, function (document) {
                    $rootScope.document = document;
                });
                $rootScope.editable = false;
            } else if ($rootScope.newDocument) {
                newDocument.title = $scope.newDocumentTitle;
                newDocument.content = $scope.newDocumentContent;
                newDocument.like = [];
                newDocument.comment = [];
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
            getComments();
            $location.path("/document/" + $rootScope.document._id);
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
                var defineUrl = DEFINE_URL + selectedText.toLowerCase();
                $http.jsonp(defineUrl)
                    .success(renderDefinition);
            }
        }

        function renderDefinition(response) {
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
            DocumentService.deleteDocumentById($rootScope.document._id, function (commentIds) {
                commentIds.forEach(function (commentId) {
                    CommentService.deleteCommentById(commentId, function (comments) {
                    });
                });
            });
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

        function getComments() {
            var docComments = $rootScope.document.comment;
            $scope.comments = [];
            for (var idx = 0; idx < docComments.length; idx++) {
                CommentService.findCommentById(docComments[idx], function (comment) {
                    var userName = "";
                    var dd = comment.lastModified;
                    UserService.findUserById(comment.userId, function (user) {
                        userName = userName + user.firstName + " " + user.lastName;
                    });
                    $scope.comments.push({
                        "_id": comment._id,
                        "userId": comment.userId,
                        "userName": userName,
                        "content": comment.content,
                        "commentDate": (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear()
                    });
                });
            }
        }

        function editComment($index) {
            $scope.editCommentIndex = $index;
        }

        function saveComment() {
            CommentService.updateComment($scope.comments[$scope.editCommentIndex]._id,
                $scope.comments[$scope.editCommentIndex].content, function (comment) {
                    var dd = comment.lastModified;
                    $scope.comments[$scope.editCommentIndex].commentDate = (dd.getMonth() + 1)
                        + "/" + dd.getDate() + "/" + dd.getFullYear();
                });
            $scope.editCommentIndex = -1;
        }

        function deleteComment($index) {
            DocumentService.deleteCommentIdxFromDocumentId($index, $rootScope.document._id, function (comment) {
                CommentService.deleteCommentById($scope.comments[$index]._id, function (comments) {
                    $scope.comments.splice($index, 1);
                    UserService.removeCommentedOnIdByUserId($rootScope.user._id,
                        $rootScope.document._id, function (commentedOn) {
                            $rootScope.user.commentedOn = commentedOn;
                        }
                    );
                });
            });
        }

        function createComment() {
            $scope.createNewDocument();
        }

        function addNewComment() {
            var newComment = {"userId": $rootScope.user._id, "content": $scope.newCcommentContent};
            CommentService.addComment(newComment, function (comment) {
                DocumentService.addCommentIdToDocummentId(comment._id, $rootScope.document._id, function (comments) {
                    var dd = comment.lastModified;
                    $scope.comments.push({
                        "_id": comment._id,
                        "userId": comment.userId,
                        "userName": $rootScope.user.firstName + " " + $rootScope.user.lastName,
                        "content": comment.content,
                        "commentDate": (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear()
                    });
                    UserService.addCommentedOnByUserId($rootScope.user._id,
                        $rootScope.document._id, function (commentedOn) {
                            $rootScope.user.commentedOn = commentedOn;
                        });
                });
            });
            $scope.newCcommentContent = "";
        }
    }
}());
