module.exports = function (app, formModel) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", addFormWithUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormsByUserId(req, res) {
        console.log("findFormsByUserId");
        var userId = req.params.userId;
        var forms = formModel.findFormsByUserId(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        console.log("findFormById");
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        console.log("deleteFormById");
        var formId = req.params.formId;
        var formDeleted = formModel.deleteFormById(formId);
        res.send(formDeleted);
    }

    function addFormWithUserId(req, res) {
        console.log("addFormWithUserId");
        var userId = req.params.userId;
        var form = req.body;
        form = formModel.addFormWithUserId(userId, form);
        res.json(form);
    }

    function updateFormById(req, res) {
        console.log("updateFormById");
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.updateFormById(formId, form);
        res.json(form);
    }
};
