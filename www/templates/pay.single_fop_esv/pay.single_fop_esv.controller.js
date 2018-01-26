(function () {
  'use strict';

    angular
        .module('app')
        .controller('paySingleFopEsv', paySingleFopEsv);

    paySingleFopEsv.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$stateParams', '$sessionStorage', 'group'];

    function paySingleFopEsv($rootScope, $state, $ionicHistory, user, $stateParams, $sessionStorage, group) {

        var vm = this;

        vm.data = $stateParams.data;
        console.log($sessionStorage.id);
        console.log($stateParams.data);
        vm.dateRegExp = /^(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})/;


        function paySecondGroup() {
            group.paySecondTax(vm.data)
                .then(function (res) {
                    $state.go('app.main');
                })

        }

    }
})();

