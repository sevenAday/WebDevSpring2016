var mock = require("./form.mock.json");
module.exports = function () {
    var api = {
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        addFormWithUserId: addFormWithUserId,
        updateFormById: updateFormById
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
        foundForm.title = form.title;
        foundForm.userId = form.userId;
        foundForm.fields = form.fields;
        return foundForm;
    }
};