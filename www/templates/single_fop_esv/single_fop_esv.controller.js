(function () {
    "use strict";

    angular
        .module('app')
        .controller('SingleFopE', SingleFopE);

    SingleFopE.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group'];

    function SingleFopE($rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams,  $scope, group) {

        var vm = this;
        vm.getEsvSum = getEsvSum;
        vm.editDate = editDate;
        vm.paySecondGroup = paySecondGroup;
        vm.user_group = $sessionStorage.group;
        vm.data = {
        };
        vm.group = $stateParams.group;
        vm.data.user = $sessionStorage.id;

        if(vm.template_data) {
            vm.data = vm.template_data;
        }
        vm.number = 1;
        $scope.inputs = [{
            value: null
        }];

      function paySecondGroup() {
        group.paySecondTax(vm.data)
          .then(function (res) {
            vm.pay_data = res;
          })

      }

        function getEsvSum() {
            group.secondTaxIncome({income: vm.tmp.income})
                .then(function (res) {
                    vm.data.sum = res.value
                })

        }

        group.getSecondGroupData()
            .then(function (res) {
                vm.data = res;
                vm.replace_date = vm.data.appointment;
                var re = /replace/g;
                vm.data.appointment = vm.data.appointment.replace(re, vm.data.for_time);

            });

        function editDate() {
            var rep = /replace/g;
            vm.data.appointment = vm.replace_date.replace(rep, vm.data.for_time);
        }

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
