(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .directive("sortableFields", sortableFields);

    function sortableFields() {
        return {
            controller: "FieldController",
            link: function () {
                $(function () {
                    $("#sortable").sortable();
                    $("#sortable").disableSelection();
                });
            },
            scope: {
                "data": "="
            },
            templateUrl: "directives/sortablefields.html"
        };
    }
}());
