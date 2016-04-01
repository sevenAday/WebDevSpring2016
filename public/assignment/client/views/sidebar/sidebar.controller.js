(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService) {
        var model = this;

        model.createAppAdmin = createAppAdmin;

        function createAppAdmin() {
            UserService.createAppAdmin()
                .then(function (response) {

                });
        }
    }
}());
