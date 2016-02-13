(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.register = register;

        function register() {
            console.log("registering...");
            $scope.isErorr = false;
            if ($scope.password != $scope.verifyPassword) {
                //$scope.errorMessage = "The passwords you entered do not match.";
                $scope.isErorr = true;
                return;
            }
        }
    }
})();
