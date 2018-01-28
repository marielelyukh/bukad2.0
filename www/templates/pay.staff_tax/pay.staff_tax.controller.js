(function () {
  'use strict';

  angular
    .module('app')
    .controller('payStaffTax', payStaffTax);

  payStaffTax.$inject = ['$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', 'group', '$stateParams', '$sessionStorage', '$timeout', '$window'];

  function payStaffTax($ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, group, $stateParams, $sessionStorage, $timeout, $window) {

    var vm = this;
    vm.back = back;
    vm.payArmy = payArmy;
    vm.payIncome_tax = payIncome_tax;
    vm.payEsv = payEsv;
    vm.editDate = editDate;
    vm.changeUrl = changeUrl;
    vm.tmp = $stateParams.values;
    vm.salary = $stateParams.data_salary;
    vm.count_workers = $stateParams.count_workers;
    console.log($stateParams.count_workers);
    vm.type = $stateParams.type;
    vm.title = $stateParams.title;
    // vm.data = $stateParams.staff_tax;
    console.log(vm.data);


    if (vm.type === 1) {
      group.getArmyData()
        .then(function (res) {
          vm.data = res;
          vm.replace_date = vm.data.appointment;
          var re = /replace/g;
          vm.data.appointment = vm.data.appointment.replace(re, vm.data.for_time);
        });
    }

    if (vm.type === 2) {
      group.getIncomeData()
        .then(function (res) {
          vm.data = res;
          vm.replace_date = vm.data.appointment;
          var re = /replace/g;
          vm.data.appointment = vm.data.appointment.replace(re, vm.data.for_time);

        });
    }

    if (vm.type === 3) {
      group.getEmployeeData()
        .then(function (res) {
          vm.data = res;
          vm.replace_date = vm.data.appointment;
          var re = /replace/g;
          vm.data.appointment = vm.data.appointment.replace(re, vm.data.for_time);
        });
    }

    function editDate() {
      var rep = /replace/g;
      vm.data.appointment = vm.replace_date.replace(rep, vm.data.for_time);
      // vm.data.appointment = vm.data.for_time;
    }


    function payArmy() {
      if (vm.form.$invalid) {
        return;
      }

      // vm.data.army = vm.data;
      vm.data.count_workers = vm.count_workers;
      vm.data.salary = vm.salary;
      vm.data.sum = vm.tmp.army_tax;
      // console.log(vm.data.army);
      //
      group.payArmy(vm.data)
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

    function payIncome_tax() {
      if (vm.form.$invalid) {
        return;
      }

      vm.data.count_workers = vm.count_workers;
      vm.data.salary = vm.salary;
      vm.data.sum = vm.tmp.income_tax;
      group.payIncome_tax(vm.data)
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

    function payEsv() {
      if (vm.form.$invalid) {
        return;
      }

      vm.data.count_workers = vm.count_workers;
      vm.data.salary = vm.salary;
      vm.data.sum = vm.tmp.esv_tax;
      group.payEsv(vm.data)
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

    function changeUrl() {
      $window.location.href = vm.resUrl;
      $state.go('app.main');
    }

    function back() {
      $ionicHistory.goBack();
    }

  }
})();

