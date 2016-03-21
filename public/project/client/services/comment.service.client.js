(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var service = {
            findCommentById: findCommentById,
            deleteCommentById: deleteCommentById,
            updateComment: updateComment,
            addComment: addComment,
            removeAllUserComments: removeAllUserComments
        };
        return service;

        function findCommentById(commentId) {
            return $http.get("/api/project/comment/" + commentId);
        }

        function updateComment(commentId, commentContent) {
            return $http.put("/api/project/comment/" + commentId, commentContent);
        }

        function deleteCommentById(commentId) {
            return $http.delete("/api/project/comment/" + commentId);
        }

        function addComment(comment) {
            return $http.post("/api/project/comment", comment);
        }

        function removeAllUserComments(userId) {
            return $http.delete("/api/project/comment/user/" + userId);
        }
    }
}());