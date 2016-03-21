(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("DocumentService", DocumentService);

    function DocumentService($http) {
        var documents = [];

        var service = {
            getAllDocuments: getAllDocuments,
            updateDocumentById: updateDocumentById,
            addNewDocument: addNewDocument,
            getDocumentsModifiedByUserId: getDocumentsModifiedByUserId,
            deleteDocumentById: deleteDocumentById,
            rateDocument: rateDocument,
            deleteCommentIdxFromDocumentId: deleteCommentIdxFromDocumentId,
            addCommentIdToDocummentId: addCommentIdToDocummentId,
            getDocumentById: getDocumentById,
            getDocumentsLikedByUserId: getDocumentsLikedByUserId,
            removeAllLikeUserIds: removeAllLikeUserIds,
            removeAllCommentIds: removeAllCommentIds
        };
        return service;

        function getAllDocuments() {
            return $http.get("/api/project/document");
        }

        function getDocumentsModifiedByUserId(userId) {
            return $http.get("/api/project/document/user/" + userId);
        }

        function updateDocumentById(documentId, newDocument) {
            return $http.put("/api/project/document/" + documentId, newDocument);
        }

        function addNewDocument(newDocument) {
            return $http.post("/api/project/document", newDocument);
        }

        function deleteDocumentById(documentId, callback) {
            var idx = -1;
            var comments;
            for (idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id == documentId) {
                    comments = documents[idx].comment;
                    break;
                }
            }
            if (idx >= 0) {
                documents.splice(idx, 1);
                callback(comments);
            }
        }

        function rateDocument(documentId, userId, liked, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id == documentId) {
                    if (liked) {
                        documents[idx].like.push(userId);
                    } else {
                        for (var idy = 0; idy < documents[idx].like.length; idy++) {
                            if (documents[idx].like[idy] == userId) {
                                documents[idx].like.splice(idy, 1);
                                break;
                            }
                        }
                    }
                    return callback(documents[idx].like);
                }
            }
        }

        function deleteCommentIdxFromDocumentId(commentIdx, documentId, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id == documentId) {
                    documents[idx].comment.splice(commentIdx, 1);
                    return callback(documents[idx].comment);
                }
            }
        }

        function addCommentIdToDocummentId(commentId, documentId, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id == documentId) {
                    documents[idx].comment.push(commentId);
                    return callback(documents[idx].comment);
                }
            }
        }

        function getDocumentById(documentId, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx]._id == documentId) {
                    return callback(documents[idx]);
                }
            }
        }

        function getDocumentsLikedByUserId(userId, callback) {
            var likedDocuments = [];
            for (var idx = 0; idx < documents.length; idx++) {
                if (documents[idx].like.indexOf(userId) >= 0) {
                    likedDocuments.push(documents[idx]);
                }
            }
            return callback(likedDocuments);
        }

        function removeAllLikeUserIds(userId, callback) {
            for (var idx = 0; idx < documents.length; idx++) {
                var likedIdx = documents[idx].like.indexOf(userId);
                if (likedIdx >= 0) {
                    documents[idx].like.splice(likedIdx, 1);
                }
            }
            return callback(documents);
        }

        function removeAllCommentIds(commentIds) {
            for (var idx = 0; idx < documents.length; idx++) {
                for (var idy = 0; idy < documents[idx].comment.length; idy++) {
                    var commentIdx = commentIds.indexOf(documents[idx].comment[idy]);
                    if (commentIdx >= 0) {
                        documents[idx].comment.splice(idy, 1);
                    }
                }
            }
        }
    }
}());