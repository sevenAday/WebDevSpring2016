"use strict";
module.exports = function (mongoose) {
    var CommentSchema = mongoose.Schema({
        "userId": String,
        "userName": String,
        "lastModified": {"type": Date, "default": new Date()},
        "content": String
    }, {"collection": "project.comment"});

    return CommentSchema;
};
