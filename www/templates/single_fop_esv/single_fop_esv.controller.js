(function () {
    "use strict";

    angular
        .module('app')
        .controller('SingleFopE', SingleFopE);

    SingleFopE.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group'];

    function SingleFopE($rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams,  $scope, group) {

        var vm = this;
        vm.getEsvSum = getEsvSum;
        vm.user_group = $sessionStorage.group;
        vm.data = {

        };
        // vm.data.receipt = true;
        // vm.data.template = false;
        // vm.template_data = $stateParams.template_data;
        vm.group = $stateParams.group;
        console.log($stateParams.group);
        console.log(vm.template_data);
        vm.data.user = $sessionStorage.id;

        if(vm.template_data) {
            vm.data = vm.template_data;
        }
        vm.number = 1;
        $scope.inputs = [{
            value: null
        }];

        function getEsvSum() {
            group.secondTaxIncome({income: vm.tmp.income})
                .then(function (res) {
                    vm.data.sum = res.value
                })

        }

        group.getSecondGroupData()
            .then(function (res) {
                vm.data = res;
                var re = /{date}/g;
                vm.data.appointment = vm.data.appointment.replace(re, vm.data.for_time);

            });

        $scope.addInput = function () {
            $scope.inputs.push({
                value: null
            });
            vm.number++;
        };

        $scope.removeInput = function (index) {
            $scope.inputs.splice(index, 1);
        };


    }
})();
