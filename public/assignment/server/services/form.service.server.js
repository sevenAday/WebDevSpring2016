"use strict";
module.exports = function (app, formModel) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", addFormWithUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId)
            .then(
                function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function (stats) {
                    res.send(true);
                },
                function (err) {
                    res.status(400).send(false);
                }
            );
    }

    function addFormWithUserId(req, res) {
        var userId = req.params.userId;
        var newForm = req.body;
        formModel.addFormWithUserId(userId, newForm)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        form = formModel.updateFormById(formId, newForm)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};
