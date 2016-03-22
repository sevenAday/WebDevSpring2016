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

        function deleteCommentIdxFromDocumentId(commentIdx, documentId) {
            return $http.delete("/api/project/document/" + documentId + "/comment/" + commentIdx);
        }

        function addCommentIdToDocummentId(commentId, documentId) {
            return $http.post("/api/project/document/" + documentId + "/comment/" + commentId);
        }

        function getDocumentById(documentId) {
            return $http.get("/api/project/document/" + documentId);
        }

        function getDocumentsLikedByUserId(userId) {
            return $http.get("/api/project/document/like/user/" + userId);
        }

        function removeAllLikeUserIds(userId) {
            return $http.delete("/api/project/document/like/user/" + userId);
        }

        function removeAllCommentIds(commentIds) {
            return $http.delete("/api/project/document/commentIds", commentIds);
        }
    }
}());