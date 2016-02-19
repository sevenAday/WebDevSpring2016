(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LogoutController", LogoutController);

    function LogoutController($rootScope) {
        delete $rootScope.user;
        delete $rootScope.isAdmin;
    }
}());
