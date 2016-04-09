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
        deleteUserById: deleteUserById,
        createAppAdmin: createAppAdmin
    };
    return api;

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .findOne({"username": username},
                function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
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
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                }
            );
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel
            .create(user,
                function (err, user) {
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
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            }
        );
        return deferred.promise;
    }

    function updateUserById(userId, newUser) {
        var deferred = q.defer();
        UserModel
            .findById(userId,
                function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        if (newUser.firstName) {
                            user.firstName = newUser.firstName;
                        }
                        if (newUser.lastName) {
                            user.lastName = newUser.lastName;
                        }
                        user.username = newUser.username;
                        if (newUser.password) {
                            user.password = newUser.password;
                        }
                        user.emails = newUser.emails;
                        if (newUser.phones) {
                            user.phones = newUser.phones;
                        }
                        if (newUser.roles) {
                            user.roles = newUser.roles;
                        }
                        user.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }
                }
            );
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel
            .remove(
                {"_id": userId},
                function (err, stats) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(stats);
                    }
                }
            );
        return deferred.promise;
    }

    function createAppAdmin() {
        /*
        var user = {
            "firstName": "Bob",
            "lastName": "Hope",
            "username": "bob",
            "password": "bob",
            "roles": ["admin"]
        };
        var deferred = q.defer();
        UserModel
            .create(user,
                function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;
        */
    }
};