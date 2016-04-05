(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var service = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            login: login,
            register: register,
            logout: logout,
            createAppAdmin: createAppAdmin
        };
        return service;

        function login(username, password) {
            return $http.post("/api/assignment/login", {"username": username, "password": password});
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
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
                return $http.post("/api/assignment/loggedin", user);
            }
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function createAppAdmin() {
            return $http.post("/api/assignment/appadmin");
        }
    }
}());