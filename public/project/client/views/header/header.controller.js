(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;

        $scope.createDocument = createDocument;
        $scope.logout = logout;
        $scope.searchForDocuments = searchForDocuments;

        function createDocument() {
            $rootScope.document = {"newDocument": true};
            $rootScope.newDocument = true;
            $rootScope.editable = false;
            $location.path("/document");
        }

        function logout() {
            UserService.logout()
                .then(function (response) {
                    if (response.status == 200) {
                        delete $rootScope.document;
                        delete $rootScope.isAdmin;
                        delete $rootScope.searching;
                        delete $rootScope.user;
                        $location.url("/home");
                    }
                });
        }

        function searchForDocuments() {
            if ($scope.keyWord) {
                $rootScope.rootKeyWord = $scope.keyWord;
                $rootScope.searching = true;
                $location.url("/results/" + $scope.keyWord);
                $scope.keyWord = "";
            }
        }
    }
}());
