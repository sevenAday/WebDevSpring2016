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
                "content": "What is required about this requirement?",
                "reply": [6]
            },
            {
                "_id": 2,
                "userId": 234,
                "lastModified": new Date(2016, 1, 24, 18, 20, 27),
                "content": "Please design this requirement so it can require.",
                "reply": [7]
            },
            {
                "_id": 3,
                "userId": 345,
                "lastModified": new Date(2016, 1, 25, 10, 0, 0),
                "content": "The functional functions.",
                "reply": [4, 5]
            },
            {
                "_id": 4,
                "userId": 456,
                "lastModified": new Date(2016, 1, 25, 10, 1, 9),
                "content": "Please clarify the clarification.",
                "reply": []
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
                "content": "I reply to your comment.",
                "reply": []
            },
            {
                "_id": 7,
                "userId": 123,
                "lastModified": new Date(2016, 1, 25, 15, 45, 36),
                "content": "I reply with this reply",
                "reply": []
            }
        ];

        var service = {
            findCommentById: findCommentById
        };
        return service;

        function findCommentById(commentId, callback) {
            for (var idx = 0; idx < comments.length; idx++) {
                if (comments[idx]._id === commentId) {
                    return callback(comments[idx]);
                }
            }
        }
    }
}());