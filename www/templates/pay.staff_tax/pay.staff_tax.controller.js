(function () {
    "use strict";

    angular
        .module('app')
        .controller('payStaffTax', payStaffTax);

    payStaffTax.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', 'group', '$stateParams', '$sessionStorage'];

    function payStaffTax($rootScope, $state, $ionicHistory, user, group, $stateParams, $sessionStorage) {

        var vm = this;
        vm.payThirdGroup = payThirdGroup;
        vm.back = back;
        vm.data = $stateParams.staff_tax;
        vm.data.values = $stateParams.values;
        vm.data.salary = $stateParams.data_salary;
        console.log($stateParams.staff_tax);
        console.log($stateParams.values);


        function payThirdGroup() {

            group.payThirdGroup(vm.data)
                .then(function (res) {
                    $state.go('app.main');
                })

        }

        function back() {
            $ionicHistory.goBack();
        }



    }
})();

