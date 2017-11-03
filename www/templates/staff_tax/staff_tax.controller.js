(function () {
    "use strict";

    angular
        .module('app')
        .controller('staffTax', staffTax);

    staffTax.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$scope', 'group', '$sessionStorage', '$stateParams'];

    function staffTax($rootScope, $state, $ionicHistory, user, $scope, group, $sessionStorage, $stateParams) {

        var vm = this;
        vm.getTaxData = getTaxData;
        vm.data = {};
        vm.data.email_invoice = true;
        vm.data.template = false;
        vm.data.user = $sessionStorage.id;
        vm.template_data = $stateParams.template_data;
        vm.salary = [];
        if(vm.template_data) {
            vm.data = vm.template_data;
        }

        vm.data.count_workers = 1;
        $scope.inputs = [{
            value: null
        }];

        $scope.addInput = function () {
            $scope.inputs.push({
                value: null
            });
            vm.data.count_workers++;
        };

        $scope.removeInput = function (index) {
            $scope.inputs.splice(index, 1);
            vm.data.count_workers--;
        };

        function getTaxData() {
            group.getData({salary: vm.salary})
                .then(function (res) {
                    vm.tmp = res;
                });
        }
        

    }
})();

