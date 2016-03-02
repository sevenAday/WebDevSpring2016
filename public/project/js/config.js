(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/username", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/document", {
                templateUrl: "views/document/document.view.html",
                controller: "DocumentController"
            })
            .when("/document/:documentTitle", {
                templateUrl: "views/document/document.view.html",
                controller: "DocumentController"
            })
            .when("/results", {
                templateUrl: "views/search/results.view.html",
                controller: "ResultsController"
            })
            .when("/results/:keyWord", {
                templateUrl: "views/search/results.view.html",
                controller: "ResultsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());
