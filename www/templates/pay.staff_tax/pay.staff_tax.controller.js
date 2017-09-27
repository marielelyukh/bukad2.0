(function () {
    "use strict";

    angular
        .module('app')
        .controller('payStaffTax', payStaffTax);

    payStaffTax.$inject = ['$rootScope', '$state', '$ionicHistory', 'user'];

    function payStaffTax($rootScope, $state, $ionicHistory, user) {

        var vm = this;
        vm.data = {

        };
        vm.data.receipt = true;



    }
})();

