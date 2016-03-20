var mock = require("./admin.mock.json");
module.exports = function () {
    var api = {
        getAdminAlertMessage: getAdminAlertMessage,
        getNumberOfPages: getNumberOfPages,
        getNumberOfActivities: getNumberOfActivities,
        saveAdminAlertMessage: saveAdminAlertMessage,
        saveNumberOfPages: saveNumberOfPages,
        saveNumberOfActivities: saveNumberOfActivities
    };
    return api;

    function getAdminAlertMessage() {
        return mock.alertMessage;
    }

    function getNumberOfPages() {
        return mock.numberOfPages;
    }

    function getNumberOfActivities() {
        return mock.numberOfActivities;
    }

    function saveAdminAlertMessage(alertMessage) {
        mock.alertMessage = alertMessage;
    }

    function saveNumberOfPages(numberOfPages) {
        mock.numberOfPages = numberOfPages;
    }

    function saveNumberOfActivities(numberOfActivities) {
        mock.numberOfActivities = numberOfActivities;
    }
};