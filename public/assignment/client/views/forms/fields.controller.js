(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, $location, $routeParams, FieldService) {
        $scope.$location = $location;

        function init() {
            if ($rootScope.user) {
                // do nothing right now
            } else {
                $location.path("/login");
            }
        }

        init();

        $scope.addField = addField;

        function addField(fieldType) {
            var fieldToAdd = null;
            if (fieldType.value == "singleLineText") {
                fieldToAdd = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (fieldType.value == "multiLineText") {
                fieldToAdd = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if (fieldType.value == "date") {
                fieldToAdd = {"_id": null, "label": "New Date Field", "type": "DATE"};
            } else if (fieldType.value == "dropDowm") {
                fieldToAdd = {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            } else if (fieldType.value == "checkboxes") {
                fieldToAdd = {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            } else if (fieldType.value == "radioButtons") {
                fieldToAdd = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }
        }
    }
}());
