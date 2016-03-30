"use strict";
module.exports = function (app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/:userId/form/:formId/field", findFieldsByUserIdAndFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdAndFieldId);
    app.post("/api/assignment/form/:formId/field", addFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormIdAndFieldId);
    app.put("/api/assignment/form/:formId/fields", updateFieldsForForm);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        fieldModel.findFieldsByFormId(formId)
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldsByUserIdAndFormId(req, res) {
        var formId = req.params.formId;
        var userId = req.params.userId;
        fieldModel.findFieldsByUserIdAndFormId(userId, formId)
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldByFormIdAndFieldId(formId, fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldByFormIdAndFieldId(formId, fieldId)
            .then(
                function (stats) {
                    return fieldModel.findFieldsByFormId(formId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.addFieldByFormId(formId, field)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFormIdAndFieldId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFieldByFormIdAndFieldId(formId, fieldId, field)
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.updateFieldsForForm(formId, fields)
            .then(
                function (fields) {
                    res.json(true);
                },
                function (err) {
                    res.status(400).send(false);
                }
            );
    }
};
