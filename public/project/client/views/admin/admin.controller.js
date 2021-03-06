(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location, UserService, DocumentService, AdminService) {
        var model = this;
        var selectedUserIndex = -1;
        var unchangedPW = null;

        model.addUser = addUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.postAlertMessage = postAlertMessage;
        model.removeAlertMessage = removeAlertMessage;
        model.updateNumberOfPages = updateNumberOfPages;
        model.updateNumberOfActivities = updateNumberOfActivities;
        model.clearPassword = clearPassword;
        model.fillPassword = fillPassword;
        model.sortUsername = sortUsername;

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
                        clearOrderIndicators();
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
                        roles = users[u].roles.join(" , ");
                    }
                    model.users.push({
                        "_id": users[u]._id,
                        "username": users[u].username,
                        "password": users[u].password,
                        "roles": roles
                    });
                }
            }
            doSort();
        }

        function addUser() {
            if (model.username && model.password && model.role) {
                var validRegExp = /^[\w\.]{2,}$/;
                if (model.password.search(validRegExp) === -1) {
                    model.username = "Invalid password!!!";
                    model.password = "";
                    model.role = "";
                    return;
                }
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
                                "roles": model.role.replace(/^[,\s]+|[,\s]+$/g, "").replace(/\s*,\s*/g, ",").split(","),
                                "commentedOn": []
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
            DocumentService.removeAllLikeUserIds(model.users[$index]._id)
                .then(function (response) {
                    DocumentService.removeAllCommentsByUserId(model.users[$index]._id)
                        .then(function (response) {
                            UserService.deleteUserById(model.users[$index]._id)
                                .then(function (response) {
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
            if (selectedUserIndex >= 0 && model.username && model.password && model.role) {
                var validRegExp = /^[\w\.]{2,}$/;
                if (model.password.search(validRegExp) === -1) {
                    model.username = "Invalid password!!!";
                    model.password = "";
                    model.role = "";
                    return;
                }
                var newUser = {
                    "username": model.users[selectedUserIndex].username,
                    "password": model.password,
                    "roles": model.role.replace(/^[,\s]+|[,\s]+$/g, "").replace(/\s*,\s*/g, ",").split(",")
                };
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

        function clearPassword() {
            unchangedPW = model.password;
            model.password = "";
            model.successful = false;
        }

        function fillPassword() {
            if (!model.password) {
                model.password = unchangedPW;
            }
        }

        function clearOrderIndicators() {
            model.uno = 0;
        }

        function getSortOrder(x, y, o) {
            if (o == 1) {
                if (x < y) {
                    return 1;
                } else if (x > y) {
                    return -1;
                }
            } else {
                if (x < y) {
                    return -1;
                } else if (x > y) {
                    return 1;
                }
            }
            return 0;
        }

        function sortUsername() {
            doSortUsername(true);
        }

        function doSortUsername(changeOrder) {
            if (changeOrder) {
                if (model.uno < 2) {
                    model.uno += 1;
                } else {
                    model.uno = 1;
                }
            }

            model.users.sort(function (x, y) {
                var x = x.username;
                var y = y.username;
                return getSortOrder(x, y, model.uno);
            });
        }

        function doSort() {
            if (model.uno > 0) {
                doSortUsername(false);
            }
        }
    }
}());
