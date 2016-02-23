(function () {
    angular
        .module("WhiteBoardApp")
        .factory("CourseService", CourseService);

    function CourseService($http) {

        var service = {
            createCourse: createCourse,
            readAllCourses: readAllCourses,
            readOneCourseById: readOneCourseById,
            deleteCourseById: deleteCourseById,
            updateCourseById: updateCourseById
        };
        return service;

        function readAllCourses(callback) {
            $http
                .get("/rest/course")
                .success(callback);
        }

        function createCourse() {}
        function readOneCourseById(id, callback) {
            $http
                .get("/rest/course" + id)
                .success(callback);
        }
        function deleteCourseById(id, callback) {
            $http
                .delete("/rest/course" + id)
                .success(callback);
        }
        function updateCourseById() {}
    }
}());