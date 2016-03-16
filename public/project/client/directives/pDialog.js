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
                    $(function () {
                        if (args.text) {
                            $("#definitionDialog").html(args.text);
                        } else {
                            $("#definitionDialog").html(args);
                        }
                        $("#definitionDialog").dialog();
                    });
                    $(window).resize(function () {
                        $("#definitionDialog").dialog("option", "position", {my: "center", at: "center", of: window});
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
