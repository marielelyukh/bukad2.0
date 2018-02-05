(function () {
  'use strict';

  angular
    .module('app')
    .controller('SingleFopE', SingleFopE);

  SingleFopE.$inject = ['$translate', '$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group', '$timeout', '$window'];

  function SingleFopE($translate, $ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams, $scope, group, $timeout, $window) {

    var vm = this;
    vm.getEsvSum = getEsvSum;
    vm.editDate = editDate;
    vm.paySecondGroup = paySecondGroup;
    vm.changeUrl = changeUrl;
    vm.getMonth = getMonth;
    vm.getYear = getYear;
    vm.user_group = $sessionStorage.group;
    vm.data = {};
    vm.group = $stateParams.group;
    vm.data.user = $sessionStorage.id;

    if (vm.template_data) {
      vm.data = vm.template_data;
    }
    vm.number = 1;
    $scope.inputs = [{
      value: null
    }];


    function getMonth() {
      var list = [];
      for (var i = 1; i <= 12; i++) {
        if (i <= 9) {
          list.push("0" + i);
        }
        else {
          list.push(i.toString());
        }
      }
      return list;
    }

    function getYear() {
      var now = new Date();
      var year = now.getFullYear();

      var list = [];

      for (var i = year - 3; i <= year + 3; i++) {
        list.push(i);
      }
      return list;
    }

    function paySecondGroup() {
      return;
      if (vm.form.$invalid) {
        return;
      }
      group.paySecondTax(vm.data)
        .then(function (res) {
          vm.pay_data = res;
          vm.resUrl = vm.pay_data.uapay.paymentPageUrl;
          if (vm.resUrl) {
            var confirmPopup = $ionicPopup.confirm({
              title: $translate.instant('GotoUaPay'),
              cancelText: $translate.instant('No'),
              okText: $translate.instant('Yes'),
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

    function changeUrl() {
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
        var re = /month/g;
        var repl = /year/g;
        vm.data.appointment = vm.data.appointment.replace(re, vm.data.month).replace(repl, vm.data.year);

      });

    function editDate() {
      var month = /month/g;
      var year = /year/g;
      vm.data.appointment = vm.replace_date.replace(month, vm.data.month).replace(year, vm.data.year);
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
