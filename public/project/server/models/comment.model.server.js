"use strict";
var q = require("q");

module.exports = function (documentModel, mongoose) {
    var Document = documentModel.getMongooseModel();

    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var CommentModel = mongoose.model("Comment", CommentSchema);

    var api = {
        updateComment: updateComment,
        addComment: addComment
    };
    return api;

    function updateComment(documentId, commentId, newComment) {
        return Document.findById(documentId)
            .then(function (document) {
                var comment = document.comment.id(commentId);
                comment.lastModified = new Date();
                comment.content = newComment.content;
                document.save();
                return comment;
            });
    }

    function addComment(documentId, newComment) {
        return Document.findById(documentId)
            .then(function (document) {
                var comment = new CommentModel();
                comment.userId = newComment.userId;
                comment.userName = newComment.userName;
                comment.content = newComment.content;
                document.comment.push(comment);
                document.save();
                return comment;
            });
    }
};
