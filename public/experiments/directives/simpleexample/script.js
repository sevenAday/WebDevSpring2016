(function() {
    angular.module('docsSimpleDirective', [])
        .controller('Controller', ['$scope', function($scope) {
            $scope.customer = {
                name: 'Naomie',
                address: '1600 Amphitheatre'
            };
        }])
        .directive('myCustomer', function() {
            return {
                template: 'Nom: {{customer.name}} Address: {{customer.address}}'
            };
        });
})();