module.exports = function (app, uuid) {
    var adminModel = require("./models/admin.model.js")();
    var userModel = require("./models/user.model.js")(uuid);

    var adminService = require("./services/admin.service.server.js")(app, adminModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
};