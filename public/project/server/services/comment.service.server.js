module.exports = function (app, commentModel) {
    app.get("/api/project/comment/:id", findCommentById);
    app.delete("/api/project/comment/:id", deleteCommentById);
    app.put("/api/project/comment/:id", updateComment);
    app.post("/api/project/comment", addComment);
    app.delete("/api/project/comment/user/:userId", removeAllUserComments);

    function findCommentById(req, res) {
        var commentId = req.params.id;
        var comment = commentModel.findCommentById(commentId);
        res.json(comment);
    }

    function deleteCommentById(req, res) {
        var commentId = req.params.id;
        var comments = commentModel.deleteCommentById(commentId);
        res.json(comments);
    }

    function updateComment(req, res) {
        var commentId = req.params.id;
        var comment = req.body;
        comment = commentModel.updateComment(commentId, comment.content);
        res.json(comment);
    }

    function addComment(req, res) {
        var comment = req.body;
        comment = commentModel.addComment(comment);
        res.json(comment);
    }

    function removeAllUserComments(req, res) {
        var userId = req.params.userId;
        var comments = commentModel.removeAllUserComments(userId);
        res.json(comments);
    }
};