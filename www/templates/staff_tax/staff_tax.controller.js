(function () {
  'use strict';

  angular
    .module('app')
    .controller('staffTax', staffTax);

  staffTax.$inject = ['exit', '$localStorage', '$rootScope', '$state', '$ionicHistory', 'user', '$scope', 'group', '$sessionStorage', '$stateParams'];

  function staffTax(exit, $localStorage, $rootScope, $state, $ionicHistory, user, $scope, group, $sessionStorage, $stateParams) {

    var vm = this;
    vm.getTaxData = getTaxData;
    vm.mainLanguage = $localStorage.locale;
    vm.data = {};
    vm.data.email_invoice = true;
    vm.data.template = false;
    vm.data.user = $sessionStorage.id;
    vm.template_data = $stateParams.template_data;

    exit.buttonBack($state.current.url);

    group.getSalary()
      .then(function (res) {
        if(res.status === 0) {
          vm.data.count_workers = 1;
          vm.salary = [];
          vm.salary.push(null);
        }
        if(res.salary){
          vm.salary = res.salary;
          vm.data.count_workers = res.count_workers;
        }

      });

    if (vm.template_data) {
      vm.data = vm.template_data;
    }

    vm.data.count_workers = 1;
    $scope.inputs = [{
      value: null
    }];


    $scope.addInput = function () {
      vm.salary.push(null)
      vm.data.count_workers++;
    };

    $scope.removeInput = function (index) {
      vm.salary.splice(index, 1);
      vm.data.count_workers--;
    };

    function getTaxData() {
      group.getData({salary: vm.salary})
        .then(function (res) {
          vm.tmp = res;
        });
    }


  }
})();

