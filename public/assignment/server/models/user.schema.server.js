"use strict";
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "emails": [String],
        "phones": [String],
        "roles": [String]
    }, {"collection": "user"});

    return UserSchema;
};
