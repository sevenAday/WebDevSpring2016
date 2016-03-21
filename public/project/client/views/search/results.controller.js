(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("ResultsController", ResultsController);

    function ResultsController($rootScope, $location, DocumentService, $routeParams) {
        var model = this;

        model.openDocument = openDocument;

        function init() {
            if (!$rootScope.searching) {
                $location.url("/home");
                return;
            }
            model.keyWord = $routeParams.keyWord;
            $rootScope.rootKeyWord = $routeParams.keyWord;
            model.documents = [];
            DocumentService.getAllDocuments()
                .then(function (response) {
                    var allDocuments = response.data;
                    allDocuments.forEach(function (document) {
                        var asbtractStr = "";
                        if (document.content) {
                            asbtractStr = document.content.substring(0, 160);
                        }
                        var newDocument = {
                            "_id": document._id,
                            "userId": document.userId,
                            "title": document.title,
                            "content": document.content,
                            "abstract": asbtractStr,
                            "lastModified": document.lastModified,
                            "like": document.like,
                            "comment": document.comment
                        };
                        model.documents.push(newDocument);
                    });

                    model.documents.sort(function (x, y) {
                        var xDate = x.lastModified;
                        var yDate = y.lastModified;
                        return (xDate < yDate) ? 1 : ((xDate > yDate) ? -1 : 0);
                    });
                });
        }

        init();

        function openDocument(selectedDocument) {
            $rootScope.document = selectedDocument;
            if ($rootScope.user) {
                $rootScope.newDocument = false;
                $rootScope.editable = false;
                $location.path("/document/" + $rootScope.document._id);
            } else {
                $location.path("/login");
            }
        }
    }
}());
