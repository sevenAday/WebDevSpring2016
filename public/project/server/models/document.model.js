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
        getDocumentById: getDocumentById,
        getDocumentsByIds: getDocumentsByIds,
        getDocumentsLikedByUserId: getDocumentsLikedByUserId,
        removeAllLikeUserIds: removeAllLikeUserIds,
        removeAllCommentIds: removeAllCommentIds
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
                mock[d].like.push(Number(userId));
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
                mock[d].comment.push(Number(commentId));
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

    function getDocumentsByIds(documentIds) {
        var documents = [];
        for (var d in documentIds) {
            var document = getDocumentById(documentIds[d]);
            if (document) {
                documents.push(document);
            }
        }
        return documents;
    }

    function getDocumentsLikedByUserId(userId) {
        var likedDocuments = [];
        for (var d in mock) {
            if (mock[d].like.indexOf(Number(userId)) >= 0) {
                likedDocuments.push(mock[d]);
            }
        }
        return likedDocuments;
    }

    function removeAllLikeUserIds(userId) {
        for (var d in mock) {
            var likedIdx = mock[d].like.indexOf(Number(userId));
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