"use strict";
var q = require("q");

module.exports = function (formModel, mongoose) {
    var Form = formModel.getMongooseModel();

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model("Field", FieldSchema);

    var api = {
        createField: createField,
        findFieldsByFormId: findFieldsByFormId,
        findFieldsByUserIdAndFormId: findFieldsByUserIdAndFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        addFieldByFormId: addFieldByFormId,
        updateFieldByFormIdAndFieldId: updateFieldByFormIdAndFieldId,
        updateFieldsForForm: updateFieldsForForm
    };
    return api;

    function createField(newField) {
        var deferred = q.defer();
        var field = new FieldModel();
        field.label = newField.label;
        field.type = newField.type;
        field.placeholder = newField.placeholder;
        field.options = newField.options;
        field.save(
            function (err, field) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(field);
                }
            });
        return deferred.promise;
    }

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
                form.fields.push(newField);
                form.save();
                return newField;
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
                form.save();
                return form.fields;
            });
    }

    function updateFieldsForForm(formId, newFields) {
        return Form.findById(formId)
            .then(function (form) {
                form.fields = newFields;
                return form.fields;
            });
    }
};