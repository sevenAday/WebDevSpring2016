(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        var model = this;

        model.update = update;
        model.clearMessage = clearMessage;

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
            } else {
                $location.path("/login");
            }
        }

        init();

        function update() {
            model.successful = false;
            var currentUser = null;
            model.showError = true;
            if (isNotEmpty($scope.profile.username.$error)
                || isNotEmpty($scope.profile.password.$error)
                || isNotEmpty($scope.profile.lastName.$error)
                || isNotEmpty($scope.profile.firstName.$error)) {
                return;
            }
            currentUser = {
                "username": model.username,
                "password": model.password,
                "firstName": model.firstName,
                "lastName": model.lastName,
                "emails": model.email.replace(/\s/g, "").split("|"),
                "phones": model.phone.replace(/\s/g, "").split("|")
            };
            UserService.updateUser($rootScope.user._id, currentUser)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    model.successful = true;
                    $location.path("/profile");
                });
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }

        function clearMessage() {
            model.successful = false;
        }
    }
}());
