(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
            {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
            {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
            {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById
        };
        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            var foundUser = null;
            for (var user in users) {
                if (user.username == username && user.password == password) {
                    foundUser = user;
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
                "_id": (new Date).getTime(),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password
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
            if (foundUser) {
                foundUser.firstName = user.firstName;
                foundUser.lastName = user.lastName;
                foundUser.username = user.username;
                foundUser.password = user.password;
            }
            return callback(foundUser);
        }
    }
})();