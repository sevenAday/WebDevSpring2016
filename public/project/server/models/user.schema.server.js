"use strict";
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String,
        "roles": [String],
        "commentedOn": [String]
    }, {"collection": "user"});

    return UserSchema;
};
