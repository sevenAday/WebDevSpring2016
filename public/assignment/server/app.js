module.exports = function (app) {
    var formModel = require("./models/form.model.js")();
    var userModel = require("./models/user.model.js")();

    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
};