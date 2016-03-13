(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .directive("fieldProperties", fieldProperties);

    function fieldProperties() {
        return {
            controller: "FieldController",
            link: function (scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal("show");
                    else
                        $(element).modal("hide");
                });

                $(element).on("show.modal", function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on("hide.modal", function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            },
            restrict: "E",
            transclude: true,
            replace: true,
            scope: {
                "data": "="
            },
            templateUrl: "directives/fieldproperties.html"
        };
    }
}());
