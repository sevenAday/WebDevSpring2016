(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("LogoutController", LogoutController);

    function LogoutController($rootScope) {
        delete $rootScope.user;
        delete $rootScope.isAdmin;
    }
}());
