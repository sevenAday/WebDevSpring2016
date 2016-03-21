(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, DocumentService) {
        var model = this;
        model.openDocument = openDocument;

        function init() {
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

                    if ($rootScope.numberOfPages < model.documents.length) {
                        model.documents.splice($rootScope.numberOfPages,
                            model.documents.length - $rootScope.numberOfPages);
                    }
                });
        }

        init();

        function openDocument($index) {
            $rootScope.document = model.documents[$index];
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
