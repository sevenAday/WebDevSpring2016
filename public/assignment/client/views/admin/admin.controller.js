(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location, UserService) {
        var model = this;
        var DELIMITER = ",";
        var selectedUserIndex = -1;
        var unchangedPW = null;

        model.addUser = addUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.clearPassword = clearPassword;
        model.fillPassword = fillPassword;
        model.sortUsername = sortUsername;
        model.sortFirstName = sortFirstName;
        model.sortLastName = sortLastName;

        function init() {
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
            for (var idx = 0; idx < users.length; idx++) {
                var roles = "";
                if (users[idx].roles) {
                    roles = users[idx].roles.join(" , ");
                }
                model.users[idx] = {
                    "_id": users[idx]._id,
                    "username": users[idx].username,
                    "password": users[idx].password,
                    "firstName": users[idx].firstName,
                    "lastName": users[idx].lastName,
                    "roles": roles
                };
            }
            doSort();
        }

        function addUser() {
            if (model.username && model.password && model.firstName && model.lastName && model.role) {
                var validRegExp = /^[\w\.]{2,}$/;
                if (model.password.search(validRegExp) === -1) {
                    clearModel();
                    model.username = "Invalid password!!!";
                    return;
                }
                UserService.findUserByUsername(model.username)
                    .then(function (response) {
                        if (response.data) {
                            clearModel();
                            model.username = "Invalid username!!!";
                        } else {
                            var newUser = {
                                "username": model.username,
                                "password": model.password,
                                "firstName": model.firstName,
                                "lastName": model.lastName,
                                "roles": model.role.replace(/^[,\s]+|[,\s]+$/g, "").replace(/\s*,\s*/g, ",").split(DELIMITER)
                            };
                            if ($rootScope.user && $rootScope.isAdmin) {
                                UserService.createUser(newUser)
                                    .then(function (response) {
                                        populateUsers(response.data);
                                        clearModel();
                                    });
                            }
                        }
                    });
            }
        }

        function deleteUser($index) {
            if (model.users[$index]._id == $rootScope.user._id) {
                clearModel();
                model.username = "Cannot delete yourself!!";
                return;
            }
            UserService.deleteUserById(model.users[$index]._id)
                .then(function (response) {
                    populateUsers(response.data);
                });
        }

        function selectUser($index) {
            if (model.users[$index]._id == $rootScope.user._id) {
                clearModel();
                model.username = "Cannot select yourself!!";
                return;
            }
            selectedUserIndex = $index;
            model.username = model.users[selectedUserIndex].username;
            model.password = model.users[selectedUserIndex].password;
            model.firstName = model.users[selectedUserIndex].firstName;
            model.lastName = model.users[selectedUserIndex].lastName;
            model.role = model.users[selectedUserIndex].roles;
        }

        function updateUser() {
            if (selectedUserIndex >= 0 && model.username && model.password && model.firstName && model.lastName && model.role) {
                var validRegExp = /^[\w\.]{2,}$/;
                if (model.password.search(validRegExp) === -1) {
                    clearModel();
                    model.username = "Invalid password!!!";
                    return;
                }
                var newUser = {
                    "username": model.users[selectedUserIndex].username,
                    "password": model.password,
                    "firstName": model.firstName,
                    "lastName": model.lastName,
                    "roles": model.role.replace(/^[,\s]+|[,\s]+$/g, "").replace(/\s*,\s*/g, ",").split(DELIMITER)
                };
                UserService.updateUser(model.users[selectedUserIndex]._id, newUser)
                    .then(function (response) {
                        populateUsers(response.data);
                        clearModel();
                        selectedUserIndex = -1;
                    });
            }
        }

        function clearModel() {
            model.username = "";
            model.password = "";
            model.firstName = "";
            model.lastName = "";
            model.role = "";
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
            model.lno = 0;
            model.fno = 0;
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
            model.lno = 0;
            model.fno = 0;

            model.users.sort(function (x, y) {
                var x = x.username;
                var y = y.username;
                return getSortOrder(x, y, model.uno);
            });
        }

        function sortFirstName() {
            doSortFirstName(true);
        }

        function doSortFirstName(changeOrder) {
            if (changeOrder) {
                if (model.fno < 2) {
                    model.fno += 1;
                } else {
                    model.fno = 1;
                }
            }
            model.lno = 0;
            model.uno = 0;

            model.users.sort(function (x, y) {
                var x = x.firstName;
                var y = y.firstName;
                return getSortOrder(x, y, model.fno);
            });
        }

        function sortLastName() {
            doSortLastName(true);
        }

        function doSortLastName(changeOrder) {
            if (changeOrder) {
                if (model.lno < 2) {
                    model.lno += 1;
                } else {
                    model.lno = 1;
                }
            }
            model.fno = 0;
            model.uno = 0;

            model.users.sort(function (x, y) {
                var x = x.lastName;
                var y = y.lastName;
                return getSortOrder(x, y, model.lno);
            });
        }

        function doSort() {
            if (model.uno > 0) {
                doSortUsername(false);
            } else if (model.fno > 0) {
                doSortFirstName(false);
            } else if (model.lno > 0) {
                doSortLastName(false);
            }
        }
    }
}());
