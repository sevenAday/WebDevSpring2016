(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location, AdminService) {
        $scope.$location = $location;

        AdminService.getAdminAlertMessage()
            .then(function (response) {
                $rootScope.alertMessageToAll = response.data.value;
                if ($rootScope.alertMessageToAll.length > 0) {
                    $rootScope.showAlertMessage = true;
                }
            });
        AdminService.getNumberOfPages()
            .then(function (response) {
                $rootScope.numberOfPages = response.data.value;
            });
        AdminService.getNumberOfActivities()
            .then(function (response) {
                $rootScope.numberOfActivities = response.data.value;
            });
    }
}());
