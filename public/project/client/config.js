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
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn,
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/username", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/document", {
                templateUrl: "views/document/document.view.html",
                controller: "DocumentController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/document/:documentId", {
                templateUrl: "views/document/document.view.html",
                controller: "DocumentController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/results", {
                templateUrl: "views/search/results.view.html",
                controller: "ResultsController",
                controllerAs: "model",
                resolve: {
                    getAdminSettings: getAdminSettings
                }
            })
            .when("/results/:keyWord", {
                templateUrl: "views/search/results.view.html",
                controller: "ResultsController",
                controllerAs: "model",
                resolve: {
                    getAdminSettings: getAdminSettings
                }
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

    function getAdminSettings(AdminService, $rootScope, $q) {
        var deferred = $q.defer();

        AdminService.getAllAdminSettings()
            .then(function (response) {
                $rootScope.alertMessageToAll = response.data.alertMessage;
                if ($rootScope.alertMessageToAll.length > 0) {
                    $rootScope.showAlertMessage = true;
                }
                $rootScope.numberOfPages = response.data.numberOfPages;
                $rootScope.numberOfActivities = response.data.numberOfActivities;
                deferred.resolve();
            });

        return deferred.promise;
    }
}());
