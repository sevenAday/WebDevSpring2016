"use strict";
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": {"type": String, "unique": true, "required": true},
        "password": String,
        "emails": [String],
        "phones": [String],
        "roles": [String]
    }, {"collection": "user"});

    return UserSchema;
};
