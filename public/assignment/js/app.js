(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home/home.view.html",
                    controller: "MainController"
                })
                .when("/profile", {
                    templateUrl: "profile.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();