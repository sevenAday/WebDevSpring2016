(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("CommentService", CommentService);

    function CommentService() {
        var comments = [
            {
                "_id": 1,
                "userId": 123,
                "lastModified": new Date(2016, 1, 26, 8, 59, 56),
                "content": "What is required about this requirement?"
            },
            {
                "_id": 2,
                "userId": 234,
                "lastModified": new Date(2016, 1, 24, 18, 20, 27),
                "content": "Please design this requirement so it can require."
            },
            {
                "_id": 3,
                "userId": 345,
                "lastModified": new Date(2016, 1, 25, 10, 0, 0),
                "content": "The functional functions."
            },
            {
                "_id": 4,
                "userId": 456,
                "lastModified": new Date(2016, 1, 25, 10, 1, 9),
                "content": "Please clarify the clarification."
            },
            {
                "_id": 5,
                "userId": 345,
                "lastModified": new Date(2016, 1, 27, 13, 36, 8),
                "content": "Who does the commandment command?",
                "reply": []
            },
            {
                "_id": 6,
                "userId": 234,
                "lastModified": new Date(2016, 1, 26, 13, 36, 8),
                "content": "I reply to your comment."
            },
            {
                "_id": 7,
                "userId": 123,
                "lastModified": new Date(2016, 1, 25, 15, 45, 36),
                "content": "I reply with this reply"
            }
        ];

        var service = {
            findCommentById: findCommentById,
            deleteCommentById: deleteCommentById,
            updateComment: updateComment
        };
        return service;

        function findCommentById(commentId, callback) {
            for (var idx = 0; idx < comments.length; idx++) {
                if (comments[idx]._id === commentId) {
                    return callback(comments[idx]);
                }
            }
        }

        function updateComment(commentId, commentContent, callback) {
            for (var idx = 0; idx < comments.length; idx++) {
                if (comments[idx]._id === commentId) {
                    comments[idx].content = commentContent;
                    comments[idx].lastModified = new Date();
                    return callback(comments[idx]);
                }
            }
        }

        function deleteCommentById(commentId, callback) {
            for (var idx = 0; idx < comments.length; idx++) {
                if (comments[idx]._id === commentId) {
                    comments.splice(idx, 1);
                    return callback(comments);
                }
            }
        }
    }
}());