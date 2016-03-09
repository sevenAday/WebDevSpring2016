(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        var selectedFormIndex = -1;
        $scope.$location = $location;
        if ($rootScope.user) {
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(function (response) {
                    $scope.forms = response.data;
                });
        } else {
            $location.path("/login");
        }

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        function addForm() {
            var newForm = {"title": $scope.formName};
            if ($scope.formName && $rootScope.user) {
                FormService.createFormForUser($rootScope.user._id, newForm)
                    .then(function (response) {
                        $scope.forms.push(response.data);
                        $scope.formName = "";
                    });
            }
        }

        function deleteForm($index) {
            FormService.deleteFormById($scope.forms[$index]._id)
                .then(function (response) {
                    $scope.forms.splice($index, 1); //only one user's forms, not everyone's
                });
        }

        function selectForm($index) {
            selectedFormIndex = $index;
            $scope.formName = $scope.forms[selectedFormIndex].title;
        }

        function updateForm() {
            var newForm = {"title": $scope.formName};
            if (selectedFormIndex >= 0) {
                FormService.updateFormById($scope.forms[selectedFormIndex]._id, newForm)
                    .then(function (response) {
                        $scope.forms[selectedFormIndex].title = response.data.title;
                        $scope.formName = "";
                        selectedFormIndex = -1;
                    });
            }
        }
    }
}());
