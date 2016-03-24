(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location, UserService) {
        var model = this;
        var selectedUserIndex = -1;

        function init() {
            if ($rootScope.user && $rootScope.isAdmin) {
                UserService.findAllUsers()
                    .then(function (response) {
                        populateUsers(response.data);
                    });
            } else {
                $location.path("/login");
            }
        }
        init();

        model.addUser = addUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function populateUsers(users) {
            model.users = [];
            for (var idx = 0; idx < users.length; idx++) {
                var roles = "";
                if (users[idx].roles) {
                    roles = users[idx].roles.join(" | ");
                }
                model.users[idx] = {
                    "_id": users[idx]._id,
                    "username": users[idx].username,
                    "password": users[idx].password,
                    "roles": roles
                };
            }
        }

        function addUser() {
            if (model.username && model.password && model.role) {
                UserService.findUserByUsername(model.username)
                    .then(function (response) {
                        if (response.data) {
                            model.username = "Invalid username!!!";
                            model.password = "";
                            model.role = "";
                        } else {
                            var newUser = {
                                "username": model.username,
                                "password": model.password,
                                "roles": model.role.replace(/\s/g, "").split("|")
                            };
                            if (model.username && model.password && model.role && $rootScope.user && $rootScope.isAdmin) {
                                UserService.createUser(newUser)
                                    .then(function (response) {
                                        populateUsers(response.data);
                                        model.username = "";
                                        model.password = "";
                                        model.role = "";
                                    });
                            }
                        }
                    });
            }
        }

        function deleteUser($index) {
            UserService.deleteUserById(model.users[$index]._id)
                .then(function (response) {
                    populateUsers(response.data);
                });
        }

        function selectUser($index) {
            selectedUserIndex = $index;
            model.username = model.users[selectedUserIndex].username;
            model.password = model.users[selectedUserIndex].password;
            model.role = model.users[selectedUserIndex].roles;
        }

        function updateUser() {
            if (model.username && model.password && model.role) {
                var newUser = {
                    "username": model.users[selectedUserIndex].username,
                    "password": model.password,
                    "roles": model.role.replace(/\s/g, "").split("|")
                };
                if (selectedUserIndex >= 0) {
                    UserService.updateUser(model.users[selectedUserIndex]._id, newUser)
                        .then(function (response) {
                            populateUsers(response.data);
                            model.username = "";
                            model.password = "";
                            model.role = "";
                            selectedUserIndex = -1;
                        });
                }
            }
        }
    }
}());
