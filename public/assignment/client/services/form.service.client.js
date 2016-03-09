(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, form) {
            return $http.put("/api/assignment/form/" + formId, form);
        }
    }
}());