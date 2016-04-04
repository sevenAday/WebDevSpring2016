"use strict";
module.exports = function (app, adminModel) {
    app.get("/api/project/admin", getAllAdminSettings);
    app.post("/api/project/admin/alertmessage", saveAdminAlertMessage);
    app.post("/api/project/admin/numberofpages", saveNumberOfPages);
    app.post("/api/project/admin/numberofactivities", saveNumberOfActivities);

    function getAllAdminSettings(req, res) {
        adminModel.getAllAdminSettings()
            .then(
                function (adminRecord) {
                    if (adminRecord) {
                        res.json(adminRecord);
                    } else {
                        return adminModel.createAdminSettings();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (adminSettings) {
                    res.json(adminSettings);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function saveAdminAlertMessage(req, res) {
        var adminAlertMessage = req.body;
        adminModel.saveAdminAlertMessage(adminAlertMessage.value)
            .then(
                function (adminSettings) {
                    res.json(adminSettings);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function saveNumberOfPages(req, res) {
        var numberOfPages = req.body;
        adminModel.saveNumberOfPages(numberOfPages.value)
            .then(
                function (adminSettings) {
                    res.json(adminSettings);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function saveNumberOfActivities(req, res) {
        var numberOfActivities = req.body;
        adminModel.saveNumberOfActivities(numberOfActivities.value)
            .then(
                function (adminSettings) {
                    res.json(adminSettings);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};