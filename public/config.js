(function () {
    "use strict";

    angular
        .module("HomePageApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/experiments", {
                templateUrl: "experiments/index.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());
