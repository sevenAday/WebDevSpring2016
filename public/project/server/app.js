module.exports = function (app, uuid, db) {
    var adminModel = require("./models/admin.model.js")();
    var commentModel = require("./models/comment.model.js")(uuid);
    var documentModel = require("./models/document.model.js")(uuid);
    var userModel = require("./models/user.model.js")(uuid);

    var adminService = require("./services/admin.service.server.js")(app, adminModel);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);
    var documentService = require("./services/document.service.server.js")(app, documentModel, commentModel, userModel);
    var userService = require("./services/user.service.server.js")(app, userModel, documentModel);
};