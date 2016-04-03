"use strict";
var q = require("q");

module.exports = function (documentModel, mongoose) {
    var Document = documentModel.getMongooseModel();

    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var CommentModel = mongoose.model("Comment", CommentSchema);

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
                mock.splice(c, 1);
                break;
            }
        }
        return mock;
    }

    function updateComment(commentId, commentContent) {
        for (var c in mock) {
            if (mock[c]._id == commentId) {
                mock[c].content = commentContent;
                mock[c].lastModified = (new Date()).toJSON();
                return mock[c];
            }
        }
        return null;
    }

    function addComment(comment) {
        var newComment = {
            "_id": uuid.v1(),
            "userId": comment.userId,
            "lastModified": (new Date()).toJSON(),
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
                mock.splice(c, 1);
            }
        }
        return removedCommentIds;
    }
};
