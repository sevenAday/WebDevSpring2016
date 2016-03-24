(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
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

        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        function populateUsers(users) {
            $scope.users = [];
            for (var idx = 0; idx < users.length; idx++) {
                var roles = "";
                if (users[idx].roles) {
                    roles = users[idx].roles.join(" | ");
                }
                $scope.users[idx] = {
                    "_id": users[idx]._id,
                    "username": users[idx].username,
                    "password": users[idx].password,
                    "roles": roles
                };
            }
        }

        function addUser() {
            if ($scope.username && $scope.password && $scope.role) {
                UserService.findUserByUsername($scope.username)
                    .then(function (response) {
                        if (response.data) {
                            $scope.username = "Invalid username!!!";
                            $scope.password = "";
                            $scope.role = "";
                        } else {
                            var newUser = {
                                "username": $scope.username,
                                "password": $scope.password,
                                "roles": $scope.role.replace(/\s/g, "").split("|")
                            };
                            if ($scope.username && $scope.password && $scope.role && $rootScope.user && $rootScope.isAdmin) {
                                UserService.createUser(newUser)
                                    .then(function (response) {
                                        populateUsers(response.data);
                                        $scope.username = "";
                                        $scope.password = "";
                                        $scope.role = "";
                                    });
                            }
                        }
                    });
            }
        }

        function deleteUser($index) {
            UserService.deleteUserById($scope.users[$index]._id)
                .then(function (response) {
                    populateUsers(response.data);
                });
        }

        function selectUser($index) {
            selectedUserIndex = $index;
            $scope.username = $scope.users[selectedUserIndex].username;
            $scope.password = $scope.users[selectedUserIndex].password;
            $scope.role = $scope.users[selectedUserIndex].roles;
        }

        function updateUser() {
            if ($scope.username && $scope.password && $scope.role) {
                var newUser = {
                    "username": $scope.users[selectedUserIndex].username,
                    "password": $scope.password,
                    "roles": $scope.role.replace(/\s/g, "").split("|")
                };
                if (selectedUserIndex >= 0) {
                    UserService.updateUser($scope.users[selectedUserIndex]._id, newUser)
                        .then(function (response) {
                            populateUsers(response.data);
                            $scope.username = "";
                            $scope.password = "";
                            $scope.role = "";
                            selectedUserIndex = -1;
                        });
                }
            }
        }
    }
}());
