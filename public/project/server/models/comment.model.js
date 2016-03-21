var mock = require("./comment.mock.json");
module.exports = function (uuid) {
    var api = {
        findCommentById: findCommentById,
        deleteCommentById: deleteCommentById,
        updateComment: updateComment,
        addComment: addComment,
        removeAllUserComments: removeAllUserComments
    };
    return api;

    function findCommentById(commentId) {
        for (var c in mock) {
            if (mock[c]._id == commentId) {
                return mock[c];
            }
        }
        return null;
    }

    function deleteCommentById(commentId) {
        for (var c in mock) {
            if (mock[c]._id == commentId) {
                mock.splice(u, 1);
                break;
            }
        }
        return mock;
    }

    function updateComment(commentId, commentContent) {
        for (var c in mock) {
            if (mock[c]._id == commentId) {
                mock[c].content = commentContent;
                mock[c].lastModified = new Date();
                return mock[c];
            }
        }
        return null;
    }

    function addComment(comment) {
        var newComment = {
            "_id": uuid.v1(),
            "userId": comment.userId,
            "lastModified": new Date(),
            "content": comment.content
        };
        mock.push(newComment);
        return newComment;
    }

    function removeAllUserComments(userId) {
        var removedCommentIds = [];
        for (var c in mock) {
            if (mock[c].userId == userId) {
                removedCommentIds.push(mock[c]._id);
                mock.splice(u, 1);
            }
        }
        return removedCommentIds;
    }
};
