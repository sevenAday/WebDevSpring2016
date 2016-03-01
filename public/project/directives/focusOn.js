(function () {
    "use strict";

    angular
        .module("DocumentCallaborationApp")
        .directive("focusOn", focusOn);

    function focusOn() {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                scope[attr.focusOn] = function () {
                    element[0].focus();
                };
            }
        };
    }
}());
