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