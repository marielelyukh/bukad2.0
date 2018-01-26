(function () {
  'use strict';

    angular
        .module('app')
        .controller('SingleFopE', SingleFopE);

    SingleFopE.$inject = ['$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group', '$timeout', '$window'];

    function SingleFopE($ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams,  $scope, group, $timeout, $window) {

        var vm = this;
        vm.getEsvSum = getEsvSum;
        vm.editDate = editDate;
        vm.paySecondGroup = paySecondGroup;
        vm.changeUrl = changeUrl;
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
        // if (vm.form.$invalid) {
        //   return;
        // }
        group.paySecondTax(vm.data)
          .then(function (res) {
            vm.pay_data = res;
            vm.resUrl = vm.pay_data.uapay.paymentPageUrl;
            if (vm.resUrl) {
              var confirmPopup = $ionicPopup.confirm({
                title: 'Перейти до сторiнки оплати UaPay?',
                // template: 'Перейти до сторiнки оплати?',
                cancelText: 'Нi',
                okText: 'Так'
              });
              confirmPopup.then(function (res) {
                if (res) {
                  $window.location.href = vm.resUrl;
                  $state.go('app.main');
                }
              });
            }
          });


      }

      function changeUrl(){
        $window.location.href = vm.resUrl;
        $state.go('app.main');
      }

        function getEsvSum() {
            group.secondTaxIncome({income: vm.tmp.income})
                .then(function (res) {
                    vm.data.sum = res.value;
                });

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
