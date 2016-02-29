(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .directive("pPop", pPop);

    function pPop($rootScope) {
        return {
            controller: "DocumentController",
            link: function ($scope) {
                $scope.$on("toggleDialog", function (event, args) {
                    $(function() {
                        $("#definitionDialog").dialog();
                    });
                });
            },
            restrict: "AE",
            scope: {
                "editable": "=",
                "showDefinition": "=",
                "definition": "=",
                "data": "="
            },
            templateUrl: "directives/ppop.html"
        };
    }
}());
