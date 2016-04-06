"use strict";
module.exports = function (passport, app, db, mongoose) {
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel = require("./models/field.model.server.js")(formModel, mongoose);
    var userModel = require("./models/user.model.server.js")(db, mongoose);

    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(passport, app, userModel);
};