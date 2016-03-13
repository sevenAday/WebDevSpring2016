module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/:userId/form/:formId/field", findFieldsByUserIdAndFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdAndFieldId);
    app.post("/api/assignment/form/:formId/field", addFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdAndFieldId);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function findFieldsByUserIdAndFormId(req, res) {
        var formId = req.params.formId;
        var userId = req.params.userId;
        var fields = formModel.findFieldsByUserIdAndFormId(userId, formId);
        res.json(fields);
    }

    function findFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFormIdAndFieldId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldDeleted = formModel.deleteFieldByFormIdAndFieldId(formId, fieldId);
        res.send(fieldDeleted);
    }

    function addFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field = formModel.addFieldByFormId(formId, field);
        res.json(field);
    }

    function updateFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fieldUpdated = formModel.updateFieldByFormIdAndFieldId(formId, fieldId, field);
        res.send(fieldUpdated);
    }
};
