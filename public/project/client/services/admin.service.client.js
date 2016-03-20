(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {

        var service = {
            getAllAdminSettings: getAllAdminSettings,
            saveAdminAlertMessage: saveAdminAlertMessage,
            saveNumberOfPages: saveNumberOfPages,
            saveNumberOfActivities: saveNumberOfActivities
        };
        return service;

        function getAllAdminSettings() {
            return $http.get("/api/project/admin");
        }

        function saveAdminAlertMessage(alertMessage) {
            return $http.post("/api/project/admin/alertmessage", alertMessage);
        }

        function saveNumberOfPages(numberOfPages) {
            return $http.post("/api/project/admin/numberofpages", numberOfPages);
        }

        function saveNumberOfActivities(numberOfActivities) {
            return $http.post("/api/project/admin/numberofactivities", numberOfActivities);
        }
    }
}());