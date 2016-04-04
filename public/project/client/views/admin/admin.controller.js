(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location, UserService, DocumentService, CommentService, AdminService) {
        var model = this;
        var selectedUserIndex = -1;

        model.addUser = addUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.postAlertMessage = postAlertMessage;
        model.removeAlertMessage = removeAlertMessage;
        model.updateNumberOfPages = updateNumberOfPages;
        model.updateNumberOfActivities = updateNumberOfActivities;

        function init() {
            model.alertMessage = $rootScope.alertMessageToAll;
            model.numberOfRecentPages = $rootScope.numberOfPages;
            model.numberOfRecentActivities = $rootScope.numberOfActivities;
            model.showPostPopover = false;
            model.postPopover = {
                hint: 'Post'
            };
            model.showRemovePopover = false;
            model.removePopover = {
                hint: 'Remove'
            };
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

        function populateUsers(users) {
            model.users = [];
            for (var u in users) {
                if (users[u]._id != $rootScope.user._id) {
                    var roles = "";
                    if (users[u].roles) {
                        roles = users[u].roles.join(" | ");
                    }
                    model.users.push({
                        "_id": users[u]._id,
                        "username": users[u].username,
                        "password": users[u].password,
                        "roles": roles
                    });
                }
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
                                "roles": model.role.replace(/\s/g, "").split("|"),
                                "commentedOn": []
                            };
                            if (model.username && model.password && model.role && $rootScope.user && $rootScope.isAdmin) {
                                UserService.createUser(newUser)
                                    .then(function (response) {
                                        populateUsers(response.data);
                                    });
                            }
                        }
                    });
            }
        }

        function deleteUser($index) {
            DocumentService.removeAllLikeUserIds(model.users[$index]._id)
                .then(function (response) {
                    DocumentService.removeAllCommentsByUserId(model.users[$index]._id);
                    UserService.deleteUserById(model.users[$index]._id)
                        .then(function (response) {
                            model.users.splice($index, 1);
                        });
                });
        }

        function selectUser($index) {
            selectedUserIndex = $index;
            model.username = model.users[selectedUserIndex].username;
            model.password = model.users[selectedUserIndex].password;
            model.role = model.users[selectedUserIndex].roles;
        }

        function updateUser() {
            if (selectedUserIndex >= 0 && model.username && model.password && model.role) {
                var newUser = {
                    "username": model.users[selectedUserIndex].username,
                    "password": model.password,
                    "roles": model.role.replace(/\s/g, "").split("|")
                };
                UserService.updateUser(model.users[selectedUserIndex]._id, newUser)
                    .then(function (response) {
                        var user = response.data;
                        model.users[selectedUserIndex]._id = user._id;
                        model.users[selectedUserIndex].username = user.username;
                        model.users[selectedUserIndex].password = user.password;
                        model.users[selectedUserIndex].roles = model.role;
                        model.username = "";
                        model.password = "";
                        model.role = "";
                        selectedUserIndex = -1;
                    });
            }
        }

        function postAlertMessage() {
            AdminService.saveAdminAlertMessage({"value": model.alertMessage});
            $rootScope.showAlertMessage = true;
            $rootScope.alertMessageToAll = model.alertMessage;
        }

        function removeAlertMessage() {
            AdminService.saveAdminAlertMessage({"value": ""});
            $rootScope.showAlertMessage = false;
            model.alertMessage = "";
        }

        function updateNumberOfPages() {
            AdminService.saveNumberOfPages({"value": model.numberOfRecentPages});
            $rootScope.numberOfPages = model.numberOfRecentPages;
        }

        function updateNumberOfActivities() {
            AdminService.saveNumberOfActivities({"value": model.numberOfRecentActivities});
            $rootScope.numberOfActivities = model.numberOfRecentActivities;
        }
    }
}());
