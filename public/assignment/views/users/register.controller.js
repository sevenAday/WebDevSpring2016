(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.register = register;

        function register() {
            $scope.showError = true;
            if ($scope.password != $scope.verifyPassword) {
                $scope.registration.verifyPassword.$error = "different";
                return;
            }
            $location.path("/profile");
        }
    }
})();
