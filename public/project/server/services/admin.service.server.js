module.exports = function (app, adminModel) {
    app.get("/api/project/admin/alertmessage", getAdminAlertMessage);
    app.get("/api/project/admin/numberofpages", getNumberOfPages);
    app.get("/api/project/admin/numberofactivities", getNumberOfActivities);
    app.post("/api/project/admin/alertmessage", saveAdminAlertMessage);
    app.post("/api/project/admin/numberofpages", saveNumberOfPages);
    app.post("/api/project/admin/numberofactivities", saveNumberOfActivities);

    function getAdminAlertMessage(req, res) {
        var adminAlertMessage = adminModel.getAdminAlertMessage();
        res.json(adminAlertMessage);
    }

    function getNumberOfPages(req, res) {
        var numberOfPages = adminModel.getNumberOfPages();
        res.json(numberOfPages);
    }

    function getNumberOfActivities(req, res) {
        var numberOfActivities = adminModel.getNumberOfActivities();
        res.json(numberOfActivities);
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