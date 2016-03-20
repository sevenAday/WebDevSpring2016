(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("AdminService", AdminService);

    function AdminService($http, $rootScope) {

        var service = {
            getAdminAlertMessage: getAdminAlertMessage,
            getNumberOfPages: getNumberOfPages,
            getNumberOfActivities: getNumberOfActivities,
            saveAdminAlertMessage: saveAdminAlertMessage,
            saveNumberOfPages: saveNumberOfPages,
            saveNumberOfActivities: saveNumberOfActivities
        };
        return service;

        function getAdminAlertMessage() {
            return $http.get("/api/project/admin/alertmessage");
        }

        function getNumberOfPages() {
            return $http.get("/api/project/admin/numberofpages");
        }

        function getNumberOfActivities() {
            return $http.get("/api/project/admin/numberofactivities");
        }

        function saveAdminAlertMessage(alertMessage) {
            return $http.post("/api/project/admin/alertmessage", alertMessage);
        }

        function saveNumberOfPages(numberOfPages) {
            return $http.post("/api/project/admin/numberofpages", numberOfPages);
        }

        function saveNumberOfActivities() {
            return $http.post("/api/project/admin/numberofactivities", numberOfActivities);
        }
    }
}());