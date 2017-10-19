(function () {
    "use strict";

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage'];

    function Main($rootScope, $state, $ionicHistory, user, $sessionStorage) {

        var vm = this;
        vm.user_group = $sessionStorage.group;
        console.log(vm.user_group)

    }
})();
