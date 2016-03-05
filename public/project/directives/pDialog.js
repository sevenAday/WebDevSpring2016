(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .directive("pDialog", pDialog);

    function pDialog() {
        return {
            controller: "DocumentController",
            link: function ($scope) {
                $scope.$on("toggleDialog", function (event, args) {
                    $scope.definition = args;
                    $(function() {
                        $("#definitionDialog").text(args.text);
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
            templateUrl: "directives/pdialog.html"
        };
    }
}());
