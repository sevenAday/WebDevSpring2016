var mock = require("./document.mock.json");
module.exports = function (uuid) {
    var api = {
        getAllDocuments: getAllDocuments,
        updateDocumentById: updateDocumentById,
        addNewDocument: addNewDocument,
        getDocumentsModifiedByUserId: getDocumentsModifiedByUserId
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
};