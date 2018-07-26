(function () {
  'use strict';

  angular
    .module('app')
    .controller('SingleFop', SingleFop);

  SingleFop.$inject = ['toastr', 'exit', '$translate', '$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group', '$localStorage', '$timeout', '$window'];

  function SingleFop(toastr, exit, $translate, $ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams, $scope, group, $localStorage, $timeout, $window) {

    var vm = this;
    vm.getSum = getSum;
    vm.editDate = editDate;
    vm.payFirstGroup = payFirstGroup;
    vm.changeUrl = changeUrl;
    vm.getMonth = getMonth;
    vm.getYear = getYear;
    vm.Pay = Pay;
    vm.buttonDisabled = false;
    vm.user_group = $localStorage.group;
    vm.tmp = {};
    vm.tmp.income = '';
    vm.data = {};
    vm.check_data = {
      request: {
        action: 'Check',
        body: {
          msisdn: $localStorage.mobile,
          user_id: $localStorage.id
        }
      }
    };
    vm.invite_data = {
      request: {
        action: 'RegisterByURL',
        body: {
          msisdn: $localStorage.mobile,
          user_id: $localStorage.id,
          lang: 'ua'
        }
      }
    };
    vm.list_data = {
      request: {
        action: 'List',
        body: {
          msisdn: $localStorage.mobile,
          user_id: $localStorage.id,
          lang: 'ua'
        }
      }
    };


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

    vm.group = $stateParams.group;
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

      if (vm.form.$invalid) {
        return;
      }
      group.payFirstGroup(vm.data)
        .then(function (res) {
          vm.pay_data = res;
          user.iPay(vm.check_data)
            .then(function (res) {
              if(res.user_status === "notexists"){
                user.iPay(vm.invite_data)
                  .then(function(res){
                    if(res.url) {
                      $window.location.href = res.url;
                    }
                  });
              }
              if(res.user_status === "exists"){
                user.iPay(vm.list_data)
                  .then(function (res) {
                    vm.cards = res;
                  });
              }
            });
        });
    }

    function Pay() {
      vm.payment_data = {
        request: {
          action: 'PaymentCreate',
          body: {
            msisdn: $localStorage.mobile,
            user_id: $localStorage.id,
            card_alias: vm.card_alias,
            invoice: vm.data.sum,
            pmt_desc: vm.data.appointment,
            pmt_info: {
              acc: vm.data.account_number,
              invoice: vm.data.sum
            }
          }
        }
      };
      user.iPay(vm.payment_data)
      .then(function(res) {
        if(res.pmt_status == 5) {
          if(vm.language === 'ua'){
            toastr.success('Оплата пройшла успішно!');
          }
          if(vm.language === 'ru'){
            toastr.success('Оплата прошла успешно!');
          }
          $timeout(function() {
            $state.go('app.main');
          }, 2000);
        }
      });
    }

    function changeUrl() {
      $window.location.href = vm.resUrl;
      $state.go('app.main');
    }

    vm.language =  $localStorage.locale;

    function getSum() {
      if(!vm.tmp.income) {
        if(vm.language === 'ua'){
          toastr.warning('Введiть суму товарообiгу!');
        }
        if(vm.language === 'ru'){
          toastr.warning('Введите сумму товарооборота!');
        }
        return;
      }
      group.firstTaxIncome({income: vm.tmp.income})
        .then(function (res) {
          vm.data.sum = res.value;
          vm.data.sum_grn = Math.floor(res.value/100);
          console.log(vm.data.sum_grn);
        });

    }

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
