"use strict";
module.exports = function (app, uuid, db) {
    var formModel = require("./models/form.model.js")(uuid);
    var userModel = require("./models/user.model.js")(uuid);

    var fieldService = require("./services/field.service.server.js")(app, formModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
};