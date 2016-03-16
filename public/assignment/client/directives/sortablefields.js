(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .directive("sortableFields", sortableFields);

    function sortableFields() {
        return {
            link: function (scope, element, attrs) {
                element.sortable();
                element.disableSelection();

                element.on("sortdeactivate", function (event, args) {
                    var y1 = $(args.item).scope().$index;
                    var y2 = element.children().index(args.item);
                    if (y1 >= 0 && y2 >= 0) {
                        scope.$apply(function () {
                            scope.$emit("fieldsReordering", {y1: y1, y2: y2});
                        })
                    }
                });
            }
        };
    }
}());
