(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, $location, $routeParams, FieldService) {
        var model = this;
        $scope.showProperties = false;

        model.addField = addField;
        model.deleteField = deleteField;
        model.editField = editField;
        model.saveField = saveField;
        model.cancelEditing = cancelEditing;

        function init() {
            if ($rootScope.user) {
                model.fields = [];
                model.formId = $routeParams.formId;
                model.userId = $routeParams.userId;
                if (model.userId) {
                    FieldService.getFieldsForUserForm(model.userId, model.formId)
                        .then(function (response) {
                            model.fields = response.data;
                        });
                } else {
                    FieldService.getFieldsForForm(model.formId)
                        .then(function (response) {
                            model.fields = response.data;
                        });
                }
            } else {
                $location.path("/login");
            }
        }

        init();

        $scope.$on("fieldsReordering", function (event, args) {
            var removedField = model.fields.splice(args.y1, 1);
            model.fields.splice(args.y2, 0, removedField[0]);
            FieldService.updateFields(model.formId, model.fields);
        });

        function addField(fieldType) {
            var fieldToAdd = null;
            if (fieldType == "singleLineText") {
                fieldToAdd = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (fieldType == "multiLineText") {
                fieldToAdd = {"_id": null, "label": "New Multi Line Text Field", "type": "TEXTAREA",
                    "placeholder": "New Field"};
            } else if (fieldType == "date") {
                fieldToAdd = {"_id": null, "label": "New Date Field", "type": "DATE"};
            } else if (fieldType == "dropDowm") {
                fieldToAdd = {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            } else if (fieldType == "checkboxes") {
                fieldToAdd = {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            } else if (fieldType == "radioButtons") {
                fieldToAdd = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }
            if (fieldToAdd) {
                FieldService.createFieldForForm(model.formId, fieldToAdd)
                    .then(function (response) {
                        model.fields.push(response.data);
                    });
            }
        }

        function getOptionString(options) {
            var optionString = "";
            if (options) {
                for (var o in options) {
                    optionString += options[o].label + ":" + options[o].value + "\n";
                }
            }
            return optionString;
        }

        function editField(field) {
            model.field = JSON.parse(JSON.stringify(field));
            if (model.field.type == "TEXT" || model.field.type == "EMAIL") {
                model.field.propertiesTitle = "Single Line Text Field";
            } else if (model.field.type == "TEXTAREA") {
                model.field.propertiesTitle = "Multi Line Text Field";
            } else if (model.field.type == "OPTIONS") {
                model.field.propertiesTitle = "Dropdown Field";
                model.field.stringifiedOptions = getOptionString(model.field.options);
            } else if (model.field.type == "CHECKBOXES") {
                model.field.propertiesTitle = "Checkboxes Field";
                model.field.stringifiedOptions = getOptionString(model.field.options);
            } else if (model.field.type == "RADIOS") {
                model.field.propertiesTitle = "Radio Buttons Field";
                model.field.stringifiedOptions = getOptionString(model.field.options);
            }
            $scope.showProperties = true;
        }

        function cancelEditing() {
            $scope.showProperties = false;
        }

        function getOptionsFromString(optionsString) {
            var optionPairsString = optionsString.split("\n");
            var options = [];
            for (var ops in optionPairsString) {
                var optionPairs = optionPairsString[ops].split(":");
                if (optionPairs[0]) {
                    options.push({"label": optionPairs[0], "value": optionPairs[1]});
                }
            }
            return options;
        }

        function saveField() {
            if (model.field.type == "OPTIONS" || model.field.type == "CHECKBOXES" || model.field.type == "RADIOS") {
                model.field.options = getOptionsFromString(model.field.stringifiedOptions);
            }
            $scope.showProperties = false;
            FieldService.updateField(model.formId, model.field._id, model.field)
                .then(function (response) {
                    model.fields = response.data;
                });
        }

        function deleteField(field) {

        }
    }
}());
