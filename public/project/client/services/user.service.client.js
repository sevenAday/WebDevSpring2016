(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            addCommentedOnByUserId: addCommentedOnByUserId,
            removeCommentedOnIdByUserId: removeCommentedOnIdByUserId,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };
        return service;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user, callback) {
            var newUser = {
                "_id": (new Date()).getTime(),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles,
                "commentedOn": user.commentedOn
            };
            users.push(newUser);
            return callback(newUser);
        }

        function deleteUserById(userId, callback) {
            var idx = users.length;
            for (idx = 0; idx < users.length; idx++) {
                if (users[idx]._id == userId) {
                    break;
                }
            }
            users.splice(idx, 1);
            return callback(users);
        }

        function updateUser(userId, user, callback) {
            var foundUser = null;
            for (var idx = 0; idx < users.length; idx++) {
                if (users[idx]._id == userId) {
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
                if (user.comentedOn) {
                    foundUser.comentedOn = user.comentedOn;
                }
            }
            return callback(foundUser);
        }

        function findUserById(userId, callback) {
            var foundUser = null;
            for (var idx = 0; idx < users.length; idx++) {
                if (users[idx]._id == userId) {
                    foundUser = users[idx];
                    break;
                }
            }
            return callback(foundUser);
        }

        function addCommentedOnByUserId(userId, documentId, callback) {
            for (var idx = 0; idx < users.length; idx++) {
                if (users[idx]._id == userId) {
                    if (users[idx].commentedOn.indexOf(documentId) < 0) {
                        users[idx].commentedOn.push(documentId);
                        return callback(users[idx].commentedOn);
                    }
                }
            };
        }

        function removeCommentedOnIdByUserId(userId, documentId, callback) {
            for (var idx = 0; idx < users.length; idx++) {
                if (users[idx]._id == userId) {
                    var documentIdx = users[idx].commentedOn.indexOf(documentId);
                    if (documentIdx >= 0) {
                        users[idx].commentedOn.splice(documentIdx, 1);
                        return callback(users[idx].commentedOn);
                    }
                }
            };
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }
    }
}());