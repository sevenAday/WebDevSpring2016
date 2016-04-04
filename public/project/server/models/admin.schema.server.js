"use strict";
module.exports = function (mongoose) {
    var AdminSchema = mongoose.Schema({
        "alertMessage": String,
        "numberOfPages": {"type": Number, "default": 10},
        "numberOfActivities": {"type": Number, "default": 10}
    }, {"collection": "project.admin"});

    return AdminSchema;
};
