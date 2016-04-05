(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login() {
            model.showError = true;
            delete $scope.signin.password.$error.invalidLogin;
            if (!isNotEmpty($scope.signin.username.$error) && !isNotEmpty($scope.signin.password.$error)) {
                UserService.login(model.username, model.password)
                    .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        if (!!$rootScope.user) {
                            $location.path("/profile");
                        } else {
                            $scope.signin.password.$error = {"invalidLogin": true};
                        }
                    });
            }
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
}());
