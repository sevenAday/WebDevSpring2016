(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .directive("pPop", pPop);

    function pPop() {
        return {
            scope: {
                "editable": "=",
                "newDocument": "=",
                "data": "="
            },
            templateUrl: "directives/ppop.html"
        };
    }
}());
