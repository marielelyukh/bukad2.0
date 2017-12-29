(function () {
    "use strict";

    angular
        .module('app')
        .controller('SingleFop', SingleFop);

    SingleFop.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group'];

    function SingleFop($rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams,  $scope, group) {

        var vm = this;
        vm.getSum = getSum;
        vm.editDate = editDate;
        vm.payFirstGroup = payFirstGroup;
        vm.user_group = $sessionStorage.group;
        vm.tmp = {};
        vm.data = {

        };
        // vm.data.receipt = true;
        // vm.data.template = false;
        // vm.template_data = $stateParams.template_data;
        vm.group = $stateParams.group;
        // console.log($stateParams.group);
        // console.log(vm.template_data);
        vm.data.user = $sessionStorage.id;

        if(vm.template_data) {
            vm.data = vm.template_data;
        }
        vm.number = 1;
        $scope.inputs = [{
            value: null
        }];

        group.getFirstGroupData()
            .then(function (res) {
                vm.data = res;
                vm.replace_date = vm.data.appointment;
                var re = /replace/g;
                vm.data.appointment = vm.data.appointment.replace(re, vm.data.for_time);

            });

      function payFirstGroup() {
        // if (vm.form.$invalid) {
        //   return;
        // }
        group.payFirstGroup(vm.data)
          .then(function (res) {
            vm.pay_data = res;
            // $state.go('app.main');
          })

      }


        function getSum() {
            group.firstTaxIncome({income: vm.tmp.income})
                .then(function (res) {
                 vm.data.sum = res.value
                })

        }

        function editDate() {
            var rep = /replace/g;
            vm.data.appointment = vm.replace_date.replace(rep, vm.data.for_time);
            // vm.data.appointment = vm.data.for_time;
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
