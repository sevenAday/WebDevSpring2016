var mock = require("./document.mock.json");
module.exports = function (uuid) {
    var api = {
        getAllDocuments: getAllDocuments,
        updateDocumentById: updateDocumentById,
        addNewDocument: addNewDocument,
        getDocumentsModifiedByUserId: getDocumentsModifiedByUserId,
        deleteDocumentById: deleteDocumentById,
        likeDocument: likeDocument,
        unlikeDocument: unlikeDocument,
        deleteCommentIdxFromDocumentId: deleteCommentIdxFromDocumentId,
        addCommentIdToDocummentId: addCommentIdToDocummentId,
        getDocumentById: getDocumentById
    };
    return api;

    function getAllDocuments() {
        return mock;
    }

    function updateDocumentById(documentId, newDocument) {
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                mock[d].userId = newDocument.userId;
                mock[d].title = newDocument.title;
                mock[d].content = newDocument.content;
                mock[d].lastModified = newDocument.lastModified;
                mock[d].like = newDocument.like;
                return mock[d];
            }
        }
        return null;
    }

    function addNewDocument(document) {
        document._id = uuid.v4();
        mock.push(document);
        return document;
    }

    function getDocumentsModifiedByUserId(userId) {
        var foundDocuments = [];
        for (var d in mock) {
            if (mock[d].userId == userId) {
                foundDocuments.push(mock[d]);
            }
        }
        return foundDocuments;

    }

    function deleteDocumentById(documentId) {
        var idx = -1;
        var comments = null;
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                comments = mock[d].comment;
                mock.splice(d, 1);
                break;
            }
        }
        return comments;
    }

    function likeDocument(documentId, userId) {
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                mock[d].like.push(userId);
                return mock[d].like;
            }
        }
        return [];
    }

    function unlikeDocument(documentId, userId) {
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                for (var l in mock[d].like) {
                    if (mock[d].like[l] == userId) {
                        mock[d].like.splice(l, 1);
                        break;
                    }
                }
                return mock[d].like;
            }
        }
        return [];
    }

    function deleteCommentIdxFromDocumentId(commentIdx, documentId) {
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                mock[d].comment.splice(commentIdx, 1);
                return mock[d].comment;
            }
        }
        return [];
    }

    function addCommentIdToDocummentId(commentId, documentId) {
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                mock[d].comment.push(commentId);
                return mock[d].comment;
            }
        }
        return [];
    }

    function getDocumentById(documentId) {
        for (var d in mock) {
            if (mock[d]._id == documentId) {
                return mock[d];
            }
        }
        return null;
    }
};