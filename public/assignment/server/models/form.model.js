var mock = require("./form.mock.json");
module.exports = function (uuid) {
    var api = {
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        addFormWithUserId: addFormWithUserId,
        updateFormById: updateFormById,
        findFieldsByFormId: findFieldsByFormId,
        findFieldsByUserIdAndFormId: findFieldsByUserIdAndFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        addFieldByFormId: addFieldByFormId,
        updateFieldByFormIdAndFieldId: updateFieldByFormIdAndFieldId,
        updateFieldsForForm: updateFieldsForForm
    };
    return api;

    function findFormByTitle(title) {
        for (var f in mock) {
            if (mock[f].title == title) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var forms = [];
        for (var f in mock) {
            if (mock[f].userId == userId) {
                forms.push(mock[f]);
            }
        }
        return forms;
    }

    function findFormById(formId) {
        for (var f in mock) {
            if (mock[f]._id == formId) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormByIdAndUserId(userId, formId) {
        for (var f in mock) {
            if (mock[f]._id == formId && mock[f].userId == userId) {
                return mock[f];
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for (var f in mock) {
            if (mock[f]._id == formId) {
                mock.splice(f, 1);
                return true;
            }
        }
        return false;
    }

    function addFormWithUserId(userId, form) {
        form._id = uuid.v1();
        form.userId = userId;
        mock.push(form);
        return form;
    }

    function updateFormById(formId, form) {
        var foundForm = findFormById(formId);
        if (foundForm) {
            foundForm.title = form.title;
            if (form.userId) {
                foundForm.userId = form.userId;
            }
            if (form.fields) {
                foundForm.fields = form.fields;
            }
        }
        return foundForm;
    }

    function findFieldsByFormId(formId) {
        var foundForm = findFormById(formId);
        if (foundForm) {
            return foundForm.fields;
        }
        return null;
    }

    function findFieldsByUserIdAndFormId(userId, formId) {
        var foundForm = findFormByIdAndUserId(userId, formId);
        if (foundForm) {
            return foundForm.fields;
        }
        return null;
    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        var foundFields = findFieldsByFormId(formId);
        if (foundFields) {
            for (var f in foundFields) {
                if (foundFields[f]._id == fieldId) {
                    return foundFields[f];
                }
            }
        }
        return null;
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        var foundFields = findFieldsByFormId(formId);
        if (foundFields) {
            for (var f in foundFields) {
                if (foundFields[f]._id == fieldId) {
                    foundFields.splice(f, 1);
                    return true;
                }
            }
        }
        return false;
    }

    function addFieldByFormId(formId, field) {
        var foundFields = findFieldsByFormId(formId);
        if (foundFields) {
            field._id = uuid.v1();
            foundFields.push(field);
        }
        return field;
    }

    function updateFieldByFormIdAndFieldId(formId, fieldId, field) {
        var foundFields = findFieldsByFormId(formId);
        if (foundFields) {
            for (var f in foundFields) {
                if (foundFields[f]._id == fieldId) {
                    foundFields[f].label = field.label;
                    foundFields[f].type = field.type;
                    foundFields[f].placeholder = field.placeholder;
                    foundFields[f].options = field.options;
                }
            }
        }
        return foundFields;
    }

    function updateFieldsForForm(formId, fields) {
        var foundForm = findFormById(formId);
        if (foundForm) {
            foundForm.fields = fields;
        }
    }
};