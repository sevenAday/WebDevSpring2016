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
            deleteCommentIdFromDocumentId: deleteCommentIdFromDocumentId,
            getDocumentById: getDocumentById,
            removeAllLikeUserIds: removeAllLikeUserIds,
            removeAllCommentsByUserId: removeAllCommentsByUserId,
            getCommentsOnDocument: getCommentsOnDocument
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

        function deleteCommentIdFromDocumentId(commentId, documentId) {
            return $http.delete("/api/project/document/" + documentId + "/comment/" + commentId);
        }

        function getDocumentById(documentId) {
            return $http.get("/api/project/document/" + documentId);
        }

        function removeAllLikeUserIds(userId) {
            return $http.delete("/api/project/document/like/user/" + userId);
        }

        function removeAllCommentsByUserId(userId) {
            return $http.delete("/api/project/document/comment/user/" + userId);
        }

        function getCommentsOnDocument(documentId) {
            return $http.get("/api/project/document/" + documentId + "/comment");
        }
    }
}());