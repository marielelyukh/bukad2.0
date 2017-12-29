(function () {
    "use strict";

    angular
        .module('app')
        .controller('ListOfStaffTax', ListOfStaffTax);

    ListOfStaffTax.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$stateParams', '$sessionStorage', 'group'];

    function ListOfStaffTax($rootScope, $state, $ionicHistory, user, $stateParams, $sessionStorage, group) {

        var vm = this;
        vm.dateRegExp = /^(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})/;
        vm.tmp = $stateParams.values;
        vm.salary = $stateParams.data_salary;
        vm.count_workers = $stateParams.count_workers;
        console.log($stateParams.count_workers);
        vm.payArmy = payArmy;
        vm.payIncome_tax = payIncome_tax;
        vm.payEsv = payEsv;

        function payArmy() {
          vm.data.army.count_workers = vm.count_workers;
          vm.data.army.salary = vm.salary;
          vm.data.army.sum = vm.tmp.army_tax;
          group.payArmy(vm.data.army)
            .then(function (res) {
              vm.pay_data = res;

            })
        }

        function payIncome_tax() {
          vm.data.income_tax.count_workers = vm.count_workers;
          vm.data.income_tax.salary = vm.salary;
          vm.data.income_tax.sum = vm.tmp.income_tax;
          group.payIncome_tax(vm.data.income_tax)
            .then(function (res) {
            })
        }

        function payEsv() {
          vm.data.esv.count_workers = vm.count_workers;
          vm.data.esv.salary = vm.salary;
          vm.data.esv.sum = vm.tmp.esv_tax;
          group.payEsv(vm.data.esv)
            .then(function (res) {
            })
        }

    }
})();

