"use strict";
module.exports = function (app, uuid, db, mongoose) {
    var formModel = require("./models/form.model.server.js")(uuid);
    var userModel = require("./models/user.model.server.js")(db, mongoose);

    var fieldService = require("./services/field.service.server.js")(app, formModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
};