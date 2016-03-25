(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var model = this;

        model.createDocument = createDocument;
        model.logout = logout;
        model.searchForDocuments = searchForDocuments;

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
            if (model.keyWord) {
                $rootScope.rootKeyWord = model.keyWord;
                $rootScope.searching = true;
                $location.url("/results/" + model.keyWord);
                model.keyWord = "";
            }
        }
    }
}());
