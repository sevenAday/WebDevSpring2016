"use strict";
module.exports = function (app, documentModel, commentModel, userModel) {
    app.get("/api/project/document", getAllDocuments);
    app.put("/api/project/document/:id", updateDocumentById);
    app.post("/api/project/document", addNewDocument);
    app.get("/api/project/document/user/:userId", getDocumentsModifiedByUserId);
    app.delete("/api/project/document/:id", deleteDocumentById);
    app.post("/api/project/document/:id/user/:userId/like", likeDocument);
    app.post("/api/project/document/:id/user/:userId/unlike", unlikeDocument);
    app.delete("/api/project/document/:id/comment/:commentId", deleteCommentIdFromDocumentId);
    app.get("/api/project/document/:id", getDocumentById);
    app.delete("/api/project/document/like/user/:userId", removeAllLikeUserIds);
    app.delete("/api/project/document/comment/user/:userId", removeAllCommentsByUserId);
    app.get("/api/project/document/:id/comment", getCommentsOnDocument);

    function getAllDocuments(req, res) {
        documentModel.getAllDocuments()
            .then(
                function (documents) {
                    res.json(documents);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateDocumentById(req, res) {
        var documentId = req.params.id;
        var newDocument = req.body;
        documentModel.updateDocumentById(documentId, newDocument)
            .then(
                function (document) {
                    res.json(document);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addNewDocument(req, res) {
        var newDocument = req.body;
        documentModel.addNewDocument(newDocument)
            .then(
                function (document) {
                    res.json(document);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getDocumentsModifiedByUserId(req, res) {
        var userId = req.params.userId;
        documentModel.getDocumentsModifiedByUserId(userId)
            .then(
                function (documents) {
                    res.json(documents);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteDocumentById(req, res) {
        var documentId = req.params.id;
        var likes = [];
        documentModel.getDocumentById(documentId)
            .then(
                function (document) {
                    var userIds = [];
                    for (var c in document.comment) {
                        userIds.push(document.comment[c].userId);
                    }
                    likes = document.like;
                    return userModel.removeCommentedOnIdByUserIds(userIds, documentId, document.like);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (stats) {
                    return userModel.removeLikeIdByUserIds(likes, documentId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (stats) {
                    return documentModel.deleteDocumentById(documentId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    res.send(true);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function likeDocument(req, res) {
        var documentId = req.params.id;
        var userId = req.params.userId;
        documentModel.likeDocument(documentId, userId)
            .then(
                function (likes) {
                    res.send(likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function unlikeDocument(req, res) {
        var documentId = req.params.id;
        var userId = req.params.userId;
        documentModel.unlikeDocument(documentId, userId)
            .then(
                function (likes) {
                    res.send(likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCommentIdFromDocumentId(req, res) {
        var documentId = req.params.id;
        var commentId = req.params.commentId;
        documentModel.deleteCommentIdFromDocumentId(commentId, documentId)
            .then(
                function (comments) {
                    res.send(comments);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getDocumentById(req, res) {
        var documentId = req.params.id;
        documentModel.getDocumentById(documentId)
            .then(
                function (document) {
                    res.send(document);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeAllLikeUserIds(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    return documentModel.removeAllLikeUserIds(user.likes, userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (stats) {
                    return documentModel.getAllDocuments();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (documents) {
                    res.json(documents);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeAllCommentsByUserId(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    return documentModel.removeAllCommentsByUserId(user.commentedOn, userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCommentsOnDocument(req, res) {
        var documentId = req.params.id;
        documentModel.getDocumentById(documentId)
            .then(
                function (document) {
                    var docComments = document.comment;
                    var comments = [];
                    for (var c in docComments) {
                        var docComment = docComments[c];
                        var dd = new Date(docComment.lastModified);
                        var userName = "You";
                        if (!req.user._id.equals(docComment.userId)) {
                            userName = docComment.userName;
                        }
                        comments.push({
                            "_id": docComment._id,
                            "userId": docComment.userId,
                            "userName": userName,
                            "content": docComment.content,
                            "commentDate": (dd.getMonth() + 1) + "/" + dd.getDate() + "/" + dd.getFullYear()
                        });
                    }
                    comments.sort(function (x, y) {
                        var xDate = x.commentDate;
                        var yDate = y.commentDate;
                        return (xDate < yDate) ? -1 : ((xDate > yDate) ? 1 : 0);
                    });
                    res.json(comments);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};