"use strict";
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": {"type": String, "unique": true, "required": true},
        "password": String,
        "email": String,
        "roles": [String],
        "likes": [String],
        "commentedOn": [String]
    }, {"collection": "project.user"});

    return UserSchema;
};
