(function () {
    "use strict";

    angular
        .module('app')
        .controller('payStaffTax', payStaffTax);

    payStaffTax.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', 'group', '$stateParams', '$sessionStorage'];

    function payStaffTax($rootScope, $state, $ionicHistory, user, group, $stateParams, $sessionStorage) {

        var vm = this;
        vm.back = back;
        vm.payArmy = payArmy;
        vm.payIncome_tax = payIncome_tax;
        vm.payEsv = payEsv;
        vm.tmp = $stateParams.values;
        vm.salary = $stateParams.data_salary;
        vm.count_workers = $stateParams.count_workers;
        vm.type = $stateParams.type;
        vm.title = $stateParams.title;
        vm.data = $stateParams.staff_tax;


        group.getThirdTaxData()
            .then(function (res) {
                vm.data = res;
                var re = /{date}/g;
                vm.data.army.appointment = vm.data.army.appointment.replace(re, vm.data.army.for_time);
                vm.data.income_tax.appointment = vm.data.income_tax.appointment.replace(re, vm.data.income_tax.for_time);
                vm.data.esv.appointment = vm.data.esv.appointment.replace(re, vm.data.esv.for_time);


            });

        function payArmy() {
            vm.data.army.count_workers = vm.count_workers;
            vm.data.army.salary = vm.salary;
            vm.data.army.sum = vm.tmp.army_tax;
            group.payArmy(vm.data.army)
                .then(function (res) {
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

        function back() {
            $ionicHistory.goBack();
        }

    }
})();

