"use strict";
var q = require("q");

module.exports = function (db, mongoose) {
    var DocumentSchema = require("./document.schema.server.js")(mongoose);
    var DocumentModel = mongoose.model("Document", DocumentSchema);

    var api = {
        getAllDocuments: getAllDocuments,
        updateDocumentById: updateDocumentById,
        addNewDocument: addNewDocument,
        getDocumentsModifiedByUserId: getDocumentsModifiedByUserId,
        deleteDocumentById: deleteDocumentById,
        likeDocument: likeDocument,
        unlikeDocument: unlikeDocument,
        deleteCommentIdxFromDocumentId: deleteCommentIdxFromDocumentId,
        addCommentDocummentId: addCommentDocummentId,
        getDocumentById: getDocumentById,
        getDocumentsByIds: getDocumentsByIds,
        removeAllLikeUserIds: removeAllLikeUserIds,
        removeAllCommentIds: removeAllCommentIds
    };
    return api;

    function getAllDocuments() {
        var deferred = q.defer();
        DocumentModel
            .find({},
                function (err, documents) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(documents);
                    }
                }
            );
        return deferred.promise;
    }

    function updateDocumentById(documentId, newDocument) {
        var deferred = q.defer();
        DocumentModel
            .findById(documentId,
                function (err, document) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        document.userId = newDocument.userId;
                        document.title = newDocument.title;
                        document.content = newDocument.content;
                        document.lastModified = newDocument.lastModified;
                        document.like = newDocument.like;
                        document.comment = newDocument.comment;
                        document.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                }
            );
        return deferred.promise;
    }

    function addNewDocument(newDocument) {
        var deferred = q.defer();
        DocumentModel
            .create(newDocument,
                function (err, document) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(addNewDocument());
                    }
                });
        return deferred.promise;
    }

    function getDocumentsModifiedByUserId(userId) {
        var deferred = q.defer();
        DocumentModel
            .find({"userId": userId},
                function (err, documents) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(documents);
                    }
                }
            );
        return deferred.promise;
    }

    function deleteDocumentById(documentId) {
        var deferred = q.defer();
        DocumentModel
            .remove(
                {"_id": documentId},
                function (err, stats) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(stats);
                    }
                }
            );
        return deferred.promise;
    }

    function likeDocument(documentId, userId) {
        return getDocumentById(documentId)
            .then(function (document) {
                document.like.push(userId);
                document.save();
                return document.like;
            });
    }

    function unlikeDocument(documentId, userId) {
        return getDocumentById(documentId)
            .then(function (document) {
                var userIdx = document.like.indexOf(userId);
                if (userIdx >= 0) {
                    document.like.splice(userIdx, 1);
                }
                document.save();
                return document.like;
            });
    }

    function deleteCommentIdxFromDocumentId(commentIdx, documentId) {
        return getDocumentById(documentId)
            .then(function (document) {
                document.comment.splice(commentIdx, 1);
                document.save();
                return document.comment;
            });
    }

    function addCommentDocummentId(comment, documentId) {
        return getDocumentById(documentId)
            .then(function (document) {
                document.comment.push(comment);
                document.save();
                return document.comment;
            });
    }

    function getDocumentById(documentId) {
        var deferred = q.defer();
        DocumentModel
            .findById(documentId,
                function (err, document) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                }
            );
        return deferred.promise;
    }

    function getDocumentsByIds(documentIds) {
        var deferred = q.defer();
        DocumentModel
            .find({"_id": {"$in": documentIds}},
                function (err, documents) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(documents);
                    }
                }
            );
        return deferred.promise;
    }

    function removeAllLikeUserIds(userId) {
        for (var d in mock) {
            var likedIdx = mock[d].like.indexOf(userId);
            if (likedIdx >= 0) {
                mock[d].like.splice(likedIdx, 1);
            }
        }
        return mock;
    }

    function removeAllCommentIds(commentIds) {
        for (var d in mock) {
            for (var c in mock[d].comment) {
                var commentIdx = commentIds.indexOf(mock[d].comment[c]);
                if (commentIdx >= 0) {
                    mock[d].comment.splice(c, 1);
                }
            }
        }
    }
};