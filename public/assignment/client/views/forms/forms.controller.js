(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, $routeParams, FormService) {
        var model = this;
        model.selectedFormIndex = -1;

        model.addForm = addForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;
        model.updateForm = updateForm;
        model.goToFields = goToFields;

        function init() {
            if ($rootScope.user) {
                FormService.findAllFormsForUser($rootScope.user._id)
                    .then(function (response) {
                        model.forms = response.data;
                        var formId = $routeParams.formId;
                        if (formId) {
                            for (var f in model.forms) {
                                if (model.forms[f]._id == formId) {
                                    model.selectedFormIndex = f;
                                    model.formName = model.forms[model.selectedFormIndex].title;
                                    break;
                                }
                            }
                        }
                    });
            } else {
                $location.path("/login");
            }
        }

        init();

        function addForm() {
            var newForm = {"title": model.formName};
            if (model.formName && $rootScope.user) {
                FormService.createFormForUser($rootScope.user._id, newForm)
                    .then(function (response) {
                        model.forms.push(response.data);
                        model.formName = "";
                    });
            }
        }

        function deleteForm($index) {
            FormService.deleteFormById(model.forms[$index]._id)
                .then(function (response) {
                    if (response.data) {
                        model.forms.splice($index, 1); //only one user's forms, not everyone's
                        if ($index == model.selectedFormIndex) {
                            model.selectedFormIndex = -1;
                            model.formName = "";
                        }
                    }
                });
        }

        function selectForm($index) {
            model.selectedFormIndex = $index;
            model.formName = model.forms[model.selectedFormIndex].title;
            $location.url("/form/" + model.forms[model.selectedFormIndex]._id);
        }

        function updateForm() {
            var newForm = {"title": model.formName};
            if (model.selectedFormIndex >= 0) {
                FormService.updateFormById(model.forms[model.selectedFormIndex]._id, newForm)
                    .then(function (response) {
                        model.forms[model.selectedFormIndex].title = response.data.title;
                        model.formName = "";
                        model.selectedFormIndex = -1;
                    });
            }
        }

        function goToFields() {
            if (model.selectedFormIndex >= 0) {
                $location.path("/"
                    + $rootScope.user._id
                    + "/form/"
                    + model.forms[model.selectedFormIndex]._id
                    + "/field");
            }
        }
    }
}());
