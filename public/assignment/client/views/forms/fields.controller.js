(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, $location, $routeParams, FieldService) {
        var model = this;
        model.showProperties = false;

        model.addField = addField;
        model.editField = editField;

        function init() {
            if ($rootScope.user) {
                model.fields = [];
                model.formId = $routeParams.formId;
                model.userId = $routeParams.userId;
                FieldService.getFieldsForUserForm(model.userId, model.formId)
                    .then(function (response) {
                        model.fields = response.data;
                    });
            } else {
                $location.path("/login");
            }
        }

        init();

        $scope.$on("fieldsReordering", function (event, args) {
            var removedField = model.fields.splice(args.y1, 1);
            model.fields.splice(args.y2, 0, removedField[0]);
        });

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

        function editField(field) {
            model.field = field;
            if (model.field.type == "TEXT") {
                model.field.propertiesTitle = "Single Line Text Field";
            } else if (model.field.type == "TEXTAREA") {
                model.field.propertiesTitle = "Multi Line Text Field";
            } else if (model.field.type == "OPTIONS") {
                model.field.propertiesTitle = "Dropdown Field";
                model.field.stringifiedOptions = JSON.stringify(model.field.options);
            } else if (model.field.type == "CHECKBOXES") {
                model.field.propertiesTitle = "Checkboxes Field";
                model.field.stringifiedOptions = JSON.stringify(model.field.options);
            } else if (model.field.type == "RADIOS") {
                model.field.propertiesTitle = "Radio Buttons Field";
                model.field.stringifiedOptions = JSON.stringify(model.field.options);
            }
            model.showProperties = true;
        }
    }
}());
