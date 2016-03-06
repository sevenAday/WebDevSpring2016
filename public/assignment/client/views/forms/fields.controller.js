(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, $rootScope, $location) {
        $scope.$location = $location;
        if ($rootScope.user) {
            // do nothing right now
        } else {
            $location.path("/login");
        }
    }
}());
