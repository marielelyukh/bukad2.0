(function () {
  'use strict';

  angular
    .module('app')
    .controller('SingleFopE', SingleFopE);

  SingleFopE.$inject = ['toastr', '$localStorage', 'exit', '$translate', '$ionicPlatform', '$ionicPopup', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope', 'group', '$timeout', '$window'];

  function SingleFopE(toastr, $localStorage, exit, $translate, $ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams, $scope, group, $timeout, $window) {

    var vm = this;
    vm.getEsvSum = getEsvSum;
    vm.editDate = editDate;
    vm.paySecondGroup = paySecondGroup;
    vm.changeUrl = changeUrl;
    vm.getMonth = getMonth;
    vm.getYear = getYear;
    vm.Pay = Pay;
    vm.user_group = $sessionStorage.group;
    vm.data = {};
    vm.group = $stateParams.group;
    vm.data.user = $sessionStorage.id;
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

    if (vm.template_data) {
      vm.data = vm.template_data;
    }
    vm.number = 1;
    $scope.inputs = [{
      value: null
    }];


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

    // exit.buttonBack($state.current.url);


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
      // return;
      if (vm.form.$invalid) {
        return;
      }
      group.paySecondTax(vm.data)
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
