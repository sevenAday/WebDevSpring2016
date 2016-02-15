(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.username = $rootScope.user.username;
        $scope.password = $rootScope.user.password;
        $scope.email = $rootScope.user.email;

        $scope.update = update;

        function update() {
            var currentUser = null;
            $scope.showError = true;
            if (isNotEmpty($scope.profile.username.$error)
                || isNotEmpty($scope.profile.password.$error)
                || isNotEmpty($scope.profile.lastName.$error)
                || isNotEmpty($scope.profile.firstName.$error)
                || isNotEmpty($scope.profile.inputEmail.$error)) {
                return;
            }
            currentUser = {
                "username": $scope.username,
                "password": $scope.password,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "email": $scope.email
            };
            UserService.updateUser($rootScope.user._id, currentUser, function(user) {
                $rootScope.user.username = user.username;
                $rootScope.user.password = user.password;
                $rootScope.user.firstName = user.firstName;
                $rootScope.user.lastName = user.lastName;
                $rootScope.user.email = user.email;
            });
            $location.path("/profile");
        }

        function isNotEmpty(obj) {
            return (Object.keys(obj).length > 0);
        }
    }
})();
