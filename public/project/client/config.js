(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
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
            .when("/document/:documentId", {
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


    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                if (user) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
}());
