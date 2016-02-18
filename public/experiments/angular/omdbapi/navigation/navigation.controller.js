(function () {
    angular
        .module("MovieApp")
        .controller("NavController", NavController);

    function NavController($scope, $location/*, $http used in Service */) {
        $scope.$location = $location;
        /*
        $http.get("http://www.omdbapi.com/?s="+title)
            .success(function (response) {
                console.log(response);
            });*/
    }
}());
