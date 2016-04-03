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
        removeAllCommentsByUserId: removeAllCommentsByUserId,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return DocumentModel;
    }

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

    function removeAllLikeUserIds(documentIds, userId) {
        var deferred = q.defer();
        DocumentModel
            .update({"_id": {"$in": documentIds}},
                {"$pull": {"project.document.like": userId}},
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

    function removeAllCommentsByUserId(documentIds, userId) {
        var deferred = q.defer();
        DocumentModel
            .update({"_id": {"$in": documentIds}},
                {"$pull": {"project.document.comment.userId": userId}},
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
};