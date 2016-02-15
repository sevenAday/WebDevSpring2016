(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var service = {
            createFormForUser: createFormForUser
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            forms.push(newForm);
            return callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var foundFormsForUser = [];
            for (var idx = 0; idx < forms.length; idx++) {
                if (forms[idx].userId === userId) {
                    foundFormsForUser.push(forms[idx]);
                }
            }
            return callback(foundFormsForUser);
        }

        function deleteFormById(formId, callback) {
            var idx = forms.length;
            for (idx = 0; idx < forms.length; idx++) {
                if (forms[idx]._id === formId) {
                    break;
                }
            }
            forms.splice(idx, 1);
            return callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var foundForm = null;
            for (var idx = 0; idx < forms.length; idx++) {
                if (forms[idx]._id === formId) {
                    foundForm = forms[idx];
                    break;
                }
            }
            if (!!foundForm) {
                foundForm.title = newForm.title;
                foundForm.userId = newForm.userId;
            }
            return callback(foundForm);
        }
    }
})();