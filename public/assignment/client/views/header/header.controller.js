(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var model = this;

        model.logout = logout;

        function logout() {
            UserService.logout()
                .then(function (response) {
                    if (response.status == 200) {
                        delete $rootScope.user;
                        delete $rootScope.isAdmin;
                        $location.url("/home");
                    }
                });
        }
    }
}());
