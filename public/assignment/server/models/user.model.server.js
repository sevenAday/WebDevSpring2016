"use strict";
var q = require("q");

module.exports = function (db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel
            .findById(userId,
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel
            .findOne({"username": credentials.username, "password": credentials.password},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(
            function (err, users) {
                if (!err) {
                    deferred.resolve(users);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var foundUser = findUserById(userId);
        if (foundUser) {
            if (user.firstName) {
                foundUser.firstName = user.firstName;
            }
            if (user.lastName) {
                foundUser.lastName = user.lastName;
            }
            foundUser.username = user.username;
            foundUser.password = user.password;
            foundUser.email = user.email;
            if (user.roles) {
                foundUser.roles = user.roles;
            }
        }
        return mock;
    }

    function deleteUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id == userId) {
                mock.splice(u, 1);
                break;
            }
        }
        return mock;
    }
};