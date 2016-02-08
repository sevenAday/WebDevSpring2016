(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "index.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();