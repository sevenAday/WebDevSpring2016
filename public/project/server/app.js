"use strict";
module.exports = function (passport, app, db, mongoose) {
    var adminModel = require("./models/admin.model.server.js")(db, mongoose);
    var documentModel = require("./models/document.model.server.js")(db, mongoose);
    var commentModel = require("./models/comment.model.server.js")(documentModel, mongoose);
    var userModel = require("./models/user.model.server.js")(db, mongoose);

    var adminService = require("./services/admin.service.server.js")(app, adminModel);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);
    var documentService = require("./services/document.service.server.js")(app, documentModel, commentModel, userModel);
    var userService = require("./services/user.service.server.js")(passport, app, userModel, documentModel);
};