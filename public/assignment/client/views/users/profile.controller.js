(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        var model = this;
        var unchangedPW = null;

        model.update = update;
        model.clearMessage = clearMessage;
        model.clearPassword = clearPassword;
        model.fillPassword = fillPassword;

        function init() {
            if ($rootScope.user) {
                model.username = $rootScope.user.username;
                model.password = $rootScope.user.password;
                model.firstName = $rootScope.user.firstName;
                model.lastName = $rootScope.user.lastName;
                if ($rootScope.user.emails) {
                    model.email = $rootScope.user.emails.join(" | ");
                }
                if ($rootScope.user.phones) {
                    model.phone = $rootScope.user.phones.join(" | ");
                }
                model.disableRegisterButton = false;
            } else {
                $location.path("/login");
            }
        }

        init();

        function update() {
            model.successful = false;
            model.showError = true;
            model.disableRegisterButton = true;
            if (isNotEmpty($scope.profile.username.$error)
                || isNotEmpty($scope.profile.password.$error)
                || isNotEmpty($scope.profile.lastName.$error)
                || isNotEmpty($scope.profile.firstName.$error)) {
                model.disableRegisterButton = false;
                return;
            }
            var validRegExp = /^[\w\.]{2,}$/;
            if (model.password.search(validRegExp) === -1) {
                $scope.profile.password.$error = {"required": true};
                model.disableRegisterButton = false;
                return;
            }
            var emails = model.email.replace(/\s/g, "").split("|");
            validRegExp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            for (var e in emails) {
                if (emails[e].search(validRegExp) === -1) {
                    $scope.profile.inputEmail.$error = {"invalidEmail": true};
                    model.disableRegisterButton = false;
                    return;
                }
            }
            delete $scope.profile.inputEmail.$error.invalidEmail;
            var phones = model.phone.replace(/\s/g, "").split("|");
            validRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            for (var p in phones) {
                if (phones[p].search(validRegExp) === -1) {
                    $scope.profile.inputPhone.$error = {"invalidPhone": true};
                    model.disableRegisterButton = false;
                    return;
                }
            }
            delete $scope.profile.inputPhone.$error.invalidPhone;
            var currentUser = {
                "username": model.username,
                "password": model.password,
                "firstName": model.firstName,
                "lastName": model.lastName,
                "emails": emails,
                "phones": phones
            };
            UserService.updateUser($rootScope.user._id, currentUser)
                .then(function (response) {
                    for (var u in response.data) {
                        if (response.data[u]._id == $rootScope.user._id) {
                            UserService.setCurrentUser(response.data[u]);
                        }
                    }
                    model.successful = true;
                    model.disableRegisterButton = false;
                    $location.path("/profile");
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }

        function clearMessage() {
            model.successful = false;
            model.disableRegisterButton = false;
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
    }
}());
