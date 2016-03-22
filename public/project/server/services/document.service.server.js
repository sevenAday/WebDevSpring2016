module.exports = function (app, documentModel) {
    app.get("/api/project/document", getAllDocuments);
    app.put("/api/project/document/:id", updateDocumentById);
    app.post("/api/project/document", addNewDocument);
    app.get("/api/project/document/user/:userId", getDocumentsModifiedByUserId);
    app.delete("/api/project/document/:id", deleteDocumentById);
    app.post("/api/project/document/:id/user/:userId/like", likeDocument);
    app.post("/api/project/document/:id/user/:userId/unlike", unlikeDocument)

    function getAllDocuments(req, res) {
        var documents = documentModel.getAllDocuments();
        res.json(documents);
    }

    function updateDocumentById(req, res) {
        var documentId = res.params.id;
        var document = req.body;
        document = documentModel.updateDocumentById(documentId, document);
        res.json(document);
    }

    function addNewDocument(req, res) {
        var document = req.body;
        document = documentModel.addNewDocument(document);
        res.json(document);
    }

    function getDocumentsModifiedByUserId(req, res) {
        var userId = req.params.userId;
        var documents = documentModel.getDocumentsModifiedByUserId(userId);
        res.json(documents);
    }

    function deleteDocumentById(req, res) {
        var documentId = req.params.id;
        var comments = documentModel.deleteDocumentById(documentId);
        res.json(comments);
    }

    function likeDocument(req, res) {
        var documentId = req.params.id;
        var userId = req.params.userId;
        var likes = documentModel.likeDocument(documentId, userId);
        res.json(likes);
    }

    function unlikeDocument(req, res) {
        var documentId = req.params.id;
        var userId = req.params.userId;
        var likes = documentModel.unlikeDocument(documentId, userId);
        res.json(likes);
    }
};