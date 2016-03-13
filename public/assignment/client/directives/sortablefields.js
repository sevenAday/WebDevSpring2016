(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .directive("sortableFields", sortableFields);

    function sortableFields() {
        return {
            link: function (scope, element, attrs) {
                element.sortable({
                    revert: true
                });
                element.disableSelection();

                element.on("sortdeactivate", function (event, args) {
                    var y1 = angular.element(args.item).scope().$index;
                    var y2 = element.children().index(args.item);
                    if (y2 >= 0) {
                        scope.$apply(function () {
                            if (y1 >= 0) {
                                scope.$emit('fieldsSorted', {y1: y1, y2: y2});
                            }
                        })
                    }
                });
            }
        };
    }
}());
