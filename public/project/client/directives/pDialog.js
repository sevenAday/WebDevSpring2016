(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .directive("pDialog", pDialog);

    function pDialog() {
        return {
            link: function (scope, element, attrs) {

                scope.$watch(attrs.visible, function (toShow) {
                    if (toShow) {
                        scope.title = attrs.title;
                        $("#definitions").html(attrs.content);
                        $(element).modal("show");
                        $(element).draggable();
                    } else {
                        $(element).modal("hide");
                    }
                });

                $(element).on("shown.bs.modal", function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on("hidden.bs.modal", function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            },
            restrict: "E",
            transclude: true,
            replace: true,
            scope: true,
            templateUrl: "directives/pdialog.html"
        };
    }
}());
