(function () {
    "use strict";

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'group'];

    function Main($rootScope, $state, $ionicHistory, user, $sessionStorage, group) {

        var vm = this;
        vm.user_group = $sessionStorage.group;
        console.log(vm.user_group)

        group.getAllTaxes()
          .then(function (res) {
            vm.taxes_data = res;
          })

    }
})();
