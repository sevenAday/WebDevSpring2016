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

                scope.$watch(attrs.visible, function (toShow) {
                    if (toShow == true) {
                        $(element).modal("show");
                    } else {
                        $(element).modal("hide");
                    }
                });

                $(element).on("showModal", function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on("hideModal", function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            },
            restrict: "E",
            transclude: true,
            replace: true,
            templateUrl: "directives/fieldproperties.html"
        };
    }
}());
