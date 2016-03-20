module.exports = function (app, adminModel) {
    app.get("/api/project/admin", getAllAdminSettings);
    app.post("/api/project/admin/alertmessage", saveAdminAlertMessage);
    app.post("/api/project/admin/numberofpages", saveNumberOfPages);
    app.post("/api/project/admin/numberofactivities", saveNumberOfActivities);

    function getAllAdminSettings(req, res) {
        res.json({"alertMessage": adminModel.getAdminAlertMessage(),
            "numberOfPages": adminModel.getNumberOfPages(),
            "numberOfActivities": adminModel.getNumberOfActivities()
        });
    }

    function saveAdminAlertMessage(req, res) {
        var adminAlertMessage = req.body;
        adminModel.saveAdminAlertMessage(adminAlertMessage.value);
        res.send(200);
    }

    function saveNumberOfPages(req, res) {
        var numberOfPages = req.body;
        adminModel.saveNumberOfPages(numberOfPages.value);
        res.send(200);
    }

    function saveNumberOfActivities(req, res) {
        var numberOfActivities = req.body;
        adminModel.saveNumberOfActivities(numberOfActivities.value);
        res.send(200);
    }
};