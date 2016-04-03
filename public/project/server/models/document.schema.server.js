"use strict";
module.exports = function (mongoose) {
    var CommentSchema = require("./comment.schema.server.js")(mongoose);

    var DocumentSchema = mongoose.Schema({
        "userId": String,
        "lastModified": Date,
        "title": {"type": String, "unique": true, "required": true},
        "content": String,
        "like": [String],
        "comment": [CommentSchema]
    }, {"collection": "project.document"});

    return DocumentSchema;
};
