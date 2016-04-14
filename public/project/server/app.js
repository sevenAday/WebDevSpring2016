"use strict";
module.exports = function (app, db, mongoose, userModel) {
    var adminModel = require("./models/admin.model.server.js")(db, mongoose);
    var documentModel = require("./models/document.model.server.js")(db, mongoose);
    var commentModel = require("./models/comment.model.server.js")(documentModel, mongoose);

    var adminService = require("./services/admin.service.server.js")(app, adminModel);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);
    var documentService = require("./services/document.service.server.js")(app, documentModel, commentModel, userModel);
    var userService = require("./services/user.service.server.js")(app, userModel, documentModel);
};