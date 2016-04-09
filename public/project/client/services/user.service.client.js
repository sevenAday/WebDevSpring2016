(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {
            findUserByUsername: findUserByUsername,
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
            login: login,
            register: register,
            logout: logout,
            getCommentedOnByUserId: getCommentedOnByUserId,
            getLikeByUserId: getLikeByUserId,
            updateLikeByUserId: updateLikeByUserId
        };
        return service;

        function login(username, password) {
            //return $http.post("/api/project/login", {"username": username, "password": password});
            return $http.post("/api/project/login?username=" + username + "&password=" + password);
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function addCommentedOnByUserId(userId, documentId) {
            return $http.post("/api/project/user/" + userId + "/commentedon/" + documentId);
        }

        function removeCommentedOnIdByUserId(userId, documentId, callback) {
            return $http.delete("/api/project/user/" + userId + "/commentedon/" + documentId);
        }

        function setCurrentUser(user) {
            if (user) {
                if (user.roles) {
                    var userRoles = user.roles.map(function (role) {
                        return role.toLowerCase();
                    });
                    if (userRoles.indexOf("admin") >= 0 || userRoles.indexOf("administrator") >= 0) {
                        $rootScope.isAdmin = true;
                    }
                }
                $rootScope.user = user;
                return $http.post("/api/project/loggedin", user);
            }
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function getCommentedOnByUserId(userId) {
            return $http.get("/api/project/user/" + userId + "/commentedon");
        }

        function getLikeByUserId(userId) {
            return $http.get("/api/project/user/" + userId + "/like");
        }

        function updateLikeByUserId(userId, documentId, liked) {
            if (liked) {
                return $http.post("/api/project/user/" + userId + "/like/" + documentId);
            } else {
                return $http.delete("/api/project/user/" + userId + "/like/" + documentId);
            }
        }
    }
}());