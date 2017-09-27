(function () {
    "use strict";

    angular
        .module('app')
        .controller('staffTax', staffTax);

    staffTax.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$scope'];

    function staffTax($rootScope, $state, $ionicHistory, user, $scope) {

        var vm = this;
        vm.data = {};
        vm.number = 1;
        $scope.inputs = [{
            value: null
        }];

        $scope.addInput = function () {
            $scope.inputs.push({
                value: null
            });
            vm.number++;
        };

        $scope.removeInput = function (index) {
            $scope.inputs.splice(index, 1);
            vm.number--;
        };
        

    }
})();

