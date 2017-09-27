(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$state', '$sessionStorage'];

    function AppCtrl($state, $sessionStorage) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;

        function logout() {
            $state.go('login');
            delete $sessionStorage.token;
            delete $sessionStorage.id;
        }


        function profile() {
            $state.go('app.profile');
        }
    }
})();
