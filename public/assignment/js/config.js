(function()
{
    angular
        .module("FormBuilderApp")
        .config(configure);

    function configure($routeProvider)
    {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "/views/home/home.view.html"
                })
            .when("/register",
                {
                    templateUrl: "/views/users/register.view.html"
                })
            .when("/login",
                {
                    templateUrl: "/views/users/login.view.html"
                })
            .when("/profile",
                {
                    templateUrl: "/views/users/profile.view.html"
                })
            .when("/admin",
                {
                    templateUrl: "/views/users/admin.view.html"
                })
    }
})();
