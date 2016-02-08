(function()
{
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("#home",
                    {
                        templateUrl: "views/home/home.view.html"
                    })
        });
})();
