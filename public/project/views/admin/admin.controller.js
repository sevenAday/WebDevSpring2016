(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        var selectedUserIndex = -1;
        $scope.alertMessage = $rootScope.alertMessageToAll;
        $scope.numberOfRecentPages = $rootScope.numberOfPages;
        $scope.numberOfRecentActivities = $rootScope.numberOfActivities;
        if ($rootScope.user && $rootScope.isAdmin) {
            UserService.findAllUsers(function (users) {
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
            });
        } else {
            $location.path("/login");
        }

        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.postAlertMessage = postAlertMessage;
        $scope.removeAlertMessage = removeAlertMessage;
        $scope.updateNumberOfPages = updateNumberOfPages;
        $scope.updateNumberOfActivities = updateNumberOfActivities;

        function addUser() {
            if ($scope.username && $scope.password && $scope.role) {
                var newUser = {
                    "username": $scope.username,
                    "password": $scope.password,
                    "roles": $scope.role.replace(/\s/g, "").split("|")
                };
                if ($scope.username && $scope.password && $scope.role && $rootScope.user && $rootScope.isAdmin) {
                    UserService.createUser(newUser, function (user) {
                        $scope.users.push({
                            "_id": user._id,
                            "username": user.username,
                            "password": user.password,
                            "roles": $scope.role
                        });
                        $scope.username = "";
                        $scope.password = "";
                        $scope.role = "";
                    });
                }
            }
        }

        function deleteUser($index) {
            UserService.deleteUserById($scope.users[$index]._id, function (users) {
                $scope.users.splice($index, 1);
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
                var newUser = {"username": $scope.username,
                    "password": $scope.password,
                    "roles": $scope.role.replace(/\s/g, "").split("|")};
                if (selectedUserIndex >= 0) {
                    UserService.updateUser($scope.users[selectedUserIndex]._id, newUser, function (user) {
                        $scope.users[selectedUserIndex]._id = user._id;
                        $scope.users[selectedUserIndex].username = user.username;
                        $scope.users[selectedUserIndex].password = user.password;
                        $scope.users[selectedUserIndex].roles = $scope.role;
                        $scope.username = "";
                        $scope.password = "";
                        $scope.role = "";
                    });
                    selectedUserIndex = -1;
                }
            }
        }

        function postAlertMessage() {
            $rootScope.showAlertMessage = true;
            $rootScope.alertMessageToAll = $scope.alertMessage;
        }

        function removeAlertMessage() {
            $rootScope.showAlertMessage = false;
            $scope.alertMessage = "";
        }

        function updateNumberOfPages() {
            $rootScope.numberOfPages = $scope.numberOfRecentPages;
        }

        function updateNumberOfActivities() {
            $rootScope.numberOfActivities = $scope.numberOfRecentActivities;
        }
    }
}());
