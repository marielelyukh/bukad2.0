(function () {
  'use strict';

  angular
    .module('app')
    .controller('payStaffTax', payStaffTax);

  payStaffTax.$inject = ['exit', '$translate', '$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', 'group', '$stateParams', '$sessionStorage', '$timeout', '$window'];

  function payStaffTax(exit, $translate, $ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, group, $stateParams, $sessionStorage, $timeout, $window) {

    var vm = this;
    vm.back = back;
    vm.payArmy = payArmy;
    vm.payIncome_tax = payIncome_tax;
    vm.payEsv = payEsv;
    vm.editDate = editDate;
    vm.changeUrl = changeUrl;
    vm.getMonth = getMonth;
    vm.getYear = getYear;
    vm.tmp = $stateParams.values;
    vm.salary = $stateParams.data_salary;
    vm.count_workers = $stateParams.count_workers;
    vm.type = $stateParams.type;
    vm.title = $stateParams.title;

    // exit.buttonBack($state.current.url);
    // console.log($stateParams.count_workers);
    // vm.data = $stateParams.staff_tax;
    // console.log(vm.data);


    if (vm.type === 1) {
      group.getArmyData()
        .then(function (res) {
          vm.data = res;
          vm.replace_date = vm.data.appointment;
          var re = /month/g;
          var repl = /year/g;
          vm.data.appointment = vm.data.appointment.replace(re, vm.data.month).replace(repl, vm.data.year);
        });
    }

    if (vm.type === 2) {
      group.getIncomeData()
        .then(function (res) {
          vm.data = res;
          vm.replace_date = vm.data.appointment;
          var re = /month/g;
          var repl = /year/g;
          vm.data.appointment = vm.data.appointment.replace(re, vm.data.month).replace(repl, vm.data.year);

        });
    }

    if (vm.type === 3) {
      group.getEmployeeData()
        .then(function (res) {
          vm.data = res;
          vm.replace_date = vm.data.appointment;
          var re = /month/g;
          var repl = /year/g;
          vm.data.appointment = vm.data.appointment.replace(re, vm.data.month).replace(repl, vm.data.year);
        });
    }

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

    function editDate() {
      var month = /month/g;
      var year = /year/g;
      vm.data.appointment = vm.replace_date.replace(month, vm.data.month).replace(year, vm.data.year);
    }


    function payArmy() {
      return;
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
              title: $translate.instant('GotoUaPay'),
              cancelText: $translate.instant('No'),
              okText:  $translate.instant('Yes'),
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
      return;
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
              title: $translate.instant('GotoUaPay'),
              cancelText: $translate.instant('No'),
              okText:  $translate.instant('Yes'),
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
      return;
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
              title: $translate.instant('GotoUaPay'),
              cancelText: $translate.instant('No'),
              okText:  $translate.instant('Yes'),
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

