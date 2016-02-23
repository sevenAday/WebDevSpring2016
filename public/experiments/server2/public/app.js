(function () {

    angular
        .module("WhiteBoardApp", [])
        .controller("CourseController", CourseController);

    function CourseController($scope, $http, CourseService) {
        CourseService.readAllCourses(function (response) {
            $scope.courses = response;
        })
    }
}());
