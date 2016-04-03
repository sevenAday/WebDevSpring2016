(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var service = {
            updateComment: updateComment,
            addComment: addComment
        };
        return service;

        function updateComment(documentId, commentId, comment) {
            return $http.put("/api/project/document/" + documentId + "/comment/" + commentId, comment);
        }

        function addComment(documentId, comment) {
            return $http.post("/api/project/document/" + documentId + "/comment", comment);
        }
    }
}());