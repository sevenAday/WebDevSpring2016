(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {"_id":123,
                "firstName":"Alice",
                "lastName":"Wonderland",
                "username":"alice",
                "password":"alice",
                "roles": ["student"]},
            {"_id":234,
                "firstName":"Bob",
                "lastName":"Hope",
                "username":"bob",
                "password":"bob",
                "roles": ["admin"]},
            {"_id":345,
                "firstName":"Charlie",
                "lastName":"Brown",
                "username":"charlie",
                "password":"charlie",
                "roles": ["faculty"]},
            {"_id":456,
                "firstName":"Dan",
                "lastName":"Craig",
                "username":"dan",
                "password":"dan",
                "roles": ["faculty", "admin"]},
            {"_id":567,
                "firstName":"Edward",
                "lastName":"Norton",
                "username":"ed",
                "password":"ed",
                "roles": ["student"]}
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            var foundUser = null;
            for (var idx = 0; idx < users.length; idx++) {
                if (users[idx].username == username && users[idx].password == password) {
                    foundUser = users[idx];
                    break;
                }
            }
            return callback(foundUser);
        }

        function findAllUsers(callback) {
            return callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                "_id": (new Date()).getTime(),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles
            };
            users.push(newUser);
            return callback(newUser);
        }

        function deleteUserById(userId, callback) {
            var idx = users.length;
            for (idx = 0; idx < users.length; idx++) {
                if (users[idx]._id === userId) {
                    break;
                }
            }
            users.splice(idx, 1);
            return callback(users);
        }

        function updateUser(userId, user, callback) {
            var foundUser = null;
            for (var idx = 0; idx < users.length; idx++) {
                if (users[idx]._id === userId) {
                    foundUser = users[idx];
                    break;
                }
            }
            if (!!foundUser) {
                if (user.firstName) {
                    foundUser.firstName = user.firstName;
                }
                if (user.lastName) {
                    foundUser.lastName = user.lastName;
                }
                foundUser.username = user.username;
                foundUser.password = user.password;
                if (user.email) {
                    foundUser.email = user.email;
                }
                if (user.roles) {
                    foundUser.roles = user.roles;
                }
            }
            return callback(foundUser);
        }
    }
}());