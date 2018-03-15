(function () {
  'use strict';

  angular
    .module('app')
    .controller('staffTax', staffTax);

  staffTax.$inject = ['toastr', 'exit', '$localStorage', '$rootScope', '$state', '$ionicHistory', 'user', '$scope', 'group', '$sessionStorage', '$stateParams'];

  function staffTax(toastr, exit, $localStorage, $rootScope, $state, $ionicHistory, user, $scope, group, $sessionStorage, $stateParams) {

    var vm = this;
    vm.getTaxData = getTaxData;
    vm.saveWorkers = saveWorkers;
    vm.mainLanguage = $localStorage.locale;
    vm.language =  $localStorage.locale;
    vm.data = {};
    vm.salary = [0];
    vm.data.email_invoice = true;
    vm.data.template = false;
    vm.data.user = $sessionStorage.id;
    vm.template_data = $stateParams.template_data;
    // vm.salary = [];
    // vm.salary.push(null);

    // exit.buttonBack($state.current.url);

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

    function saveWorkers() {
      if(vm.salary.length < 1) {
        if(vm.language === 'ua'){
          toastr.warning('Заповнiть спiвробiтникiв!');
        }
        if(vm.language === 'ru'){
          toastr.warning('Заполните сотрудников!');
        }
        return;
      }
      group.saveWorkers({salary: vm.salary});
    }

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
      if(!vm.salary) {
        if(vm.language === 'ua'){
          toastr.warning('Заповнiть спiвробiтникiв!');
        }
        if(vm.language === 'ru'){
          toastr.warning('Заполните сотрудников!');
        }
        return;
      }
      group.getData({salary: vm.salary})
        .then(function (res) {
          vm.tmp = res;
          $sessionStorage.tmp = vm.tmp;
        });
      group.saveWorkers({salary: vm.salary});
    }


  }
})();

