(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location, UserService, DocumentService, CommentService) {
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
                    .then(function (users) {
                        model.users = [];
                        for (var u in users) {
                            var roles = "";
                            if (users[u].roles) {
                                roles = users[u].roles.join(" | ");
                            }
                            model.users[u] = {
                                "_id": users[u]._id,
                                "username": users[u].username,
                                "password": users[u].password,
                                "roles": roles
                            };
                        }
                    });
            } else {
                $location.path("/login");
            }
        }

        init();

        function addUser() {
            if (model.username && model.password && model.role) {
                var newUser = {
                    "username": model.username,
                    "password": model.password,
                    "roles": model.role.replace(/\s/g, "").split("|"),
                    "commentedOn": []
                };
                if (model.username && model.password && model.role && $rootScope.user && $rootScope.isAdmin) {
                    UserService.createUser(newUser)
                        .then(function (user) {
                            model.users.push({
                                "_id": user._id,
                                "username": user.username,
                                "password": user.password,
                                "roles": model.role
                            });
                            model.username = "";
                            model.password = "";
                            model.role = "";
                        });
                }
            }
        }

        function deleteUser($index) {
            DocumentService.removeAllLikeUserIds(model.users[$index]._id, function (documents) {
                CommentService.removeAllUserComments(model.users[$index]._id, function (commentIds) {
                    DocumentService.removeAllCommentIds(commentIds);
                    UserService.deleteUserById(model.users[$index]._id, function (users) {
                        model.users.splice($index, 1);
                    });
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
            if (model.username && model.password && model.role) {
                var newUser = {
                    "username": model.username,
                    "password": model.password,
                    "roles": model.role.replace(/\s/g, "").split("|")
                };
                if (selectedUserIndex >= 0) {
                    UserService.updateUser(model.users[selectedUserIndex]._id, newUser, function (user) {
                        model.users[selectedUserIndex]._id = user._id;
                        model.users[selectedUserIndex].username = user.username;
                        model.users[selectedUserIndex].password = user.password;
                        model.users[selectedUserIndex].roles = model.role;
                        model.username = "";
                        model.password = "";
                        model.role = "";
                    });
                    selectedUserIndex = -1;
                }
            }
        }

        function postAlertMessage() {
            $rootScope.showAlertMessage = true;
            $rootScope.alertMessageToAll = model.alertMessage;
        }

        function removeAlertMessage() {
            $rootScope.showAlertMessage = false;
            model.alertMessage = "";
        }

        function updateNumberOfPages() {
            $rootScope.numberOfPages = model.numberOfRecentPages;
        }

        function updateNumberOfActivities() {
            $rootScope.numberOfActivities = model.numberOfRecentActivities;
        }
    }
}());
