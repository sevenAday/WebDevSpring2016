"use strict";
var q = require("q");

module.exports = function (formModel, mongoose) {
    var Form = formModel.getMongooseModel();

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model("Field", FieldSchema);

    var api = {
        findFieldsByFormId: findFieldsByFormId,
        findFieldsByUserIdAndFormId: findFieldsByUserIdAndFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        addFieldByFormId: addFieldByFormId,
        updateFieldByFormIdAndFieldId: updateFieldByFormIdAndFieldId,
        updateFieldsForForm: updateFieldsForForm
    };
    return api;

    function findFieldsByFormId(formId) {
        return Form.findById(formId).select("fields");
    }

    function findFieldsByUserIdAndFormId(userId, formId) {
        return Form.findOne({"_id": formId, "userId": userId}).select("fields");
    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        return Form.findById(formId)
            .then(function (form) {
                return form.fields.id(fieldId);
            });
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        return Form.findById(formId)
            .then(function (form) {
                form.fields.id(fieldId).remove();
                return form.save();
            });
    }

    function addFieldByFormId(formId, newField) {
        return Form.findById(formId)
            .then(function (form) {
                var field = new FieldModel();
                field.label = newField.label;
                field.type = newField.type;
                field.placeholder = newField.placeholder;
                field.options = newField.options;
                form.fields.push(field);
                return form.save();
            });
    }

    function updateFieldByFormIdAndFieldId(formId, fieldId, newField) {
        return Form.findById(formId)
            .then(function (form) {
                var field = form.fields.id(fieldId);
                field.label = newField.label;
                field.type = newField.type;
                field.placeholder = newField.placeholder;
                field.options = newField.options;
                return form.save();
            });
    }

    function updateFieldsForForm(formId, newFields) {
        return Form.findById(formId)
            .then(function (form) {
                form.fields = newFields;
                return form.save();
            });
    }
};