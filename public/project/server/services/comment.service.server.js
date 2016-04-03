"use strict";
module.exports = function (app, commentModel) {
    app.put("/api/project/document/:documentId/comment/:id", updateComment);
    app.post("/api/project/document/:documentId/comment", addComment);

    function updateComment(req, res) {
        var documentId = req.params.documentId;
        var commentId = req.params.id;
        var newComment = req.body;
        commentModel.updateComment(documentId, commentId, newComment)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addComment(req, res) {
        var documentId = req.params.documentId;
        var newComment = req.body;
        commentModel.addComment(documentId, newComment)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};