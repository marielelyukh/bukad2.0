(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListOfStaffTax', ListOfStaffTax);

    ListOfStaffTax.$inject = ['exit', '$localStorage', '$rootScope', '$state', '$ionicHistory', 'user', '$stateParams', '$sessionStorage', 'group'];

    function ListOfStaffTax(exit, $localStorage, $rootScope, $state, $ionicHistory, user, $stateParams, $sessionStorage, group) {

        var vm = this;
        vm.dateRegExp = /^(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})/;
        vm.tmp = $stateParams.values;
        vm.mainLanguage = $localStorage.locale;
        vm.salary = $stateParams.data_salary;
        vm.count_workers = $stateParams.count_workers;

      exit.buttonBack($state.current.url);

      group.getStatusWorkers()
        .then(function (res) {
          vm.taxes_status = res;
        });
    }
})();

