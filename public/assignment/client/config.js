(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/form", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/form/:formId", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/field", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/form/:formId/field", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/:userId/form/:formId/field", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());
