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

        function deleteDocumentById(documentId) {
            return $http.delete("/api/project/document/" + documentId);
        }

        function rateDocument(documentId, userId, liked) {
            if (liked) {
                return $http.post("/api/project/document/" + documentId + "/user/" + userId + "/like");
            } else {
                return $http.post("/api/project/document/" + documentId + "/user/" + userId + "/unlike");
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