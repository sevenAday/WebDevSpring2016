"use strict";
module.exports = function (mongoose) {
    var CommentSchema = mongoose.Schema({
        "userId": String,
        "lastModified": Date,
        "content": String
    }, {"collection": "project.comment"});

    return CommentSchema;
};
