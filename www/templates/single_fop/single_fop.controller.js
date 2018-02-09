(function () {
  'use strict';

  angular
    .module('app')
    .controller('SingleFop', SingleFop);

  SingleFop.$inject = ['exit', '$translate', '$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group', '$localStorage', '$timeout', '$window'];

  function SingleFop(exit, $translate, $ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams, $scope, group, $localStorage, $timeout, $window) {

    var vm = this;
    vm.getSum = getSum;
    vm.editDate = editDate;
    vm.payFirstGroup = payFirstGroup;
    vm.changeUrl = changeUrl;
    vm.getMonth = getMonth;
    vm.getYear = getYear;
    vm.user_group = $localStorage.group;
    vm.tmp = {};
    vm.data = {};

    exit.buttonBack($state.current.url);



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


    // vm.data.receipt = true;
    // vm.data.template = false;
    // vm.template_data = $stateParams.template_data;
    vm.group = $stateParams.group;
    // console.log($stateParams.group);
    // console.log(vm.template_data);
    vm.data.user = $sessionStorage.id;

    if (vm.template_data) {
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
        var re = /month/g;
        var repl = /year/g;
        vm.data.appointment = vm.data.appointment.replace(re, vm.data.month).replace(repl, vm.data.year);

      });

    function payFirstGroup() {
      return;
      if (vm.form.$invalid) {
        return;
      }
      group.payFirstGroup(vm.data)
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


    function getSum() {
      group.firstTaxIncome({income: vm.tmp.income})
        .then(function (res) {
          vm.data.sum = res.value;
        });

    }

    function editDate() {
      var month = /month/g;
      var year = /year/g;
      vm.data.appointment = vm.replace_date.replace(month, vm.data.month).replace(year, vm.data.year);

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
