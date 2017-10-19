(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$state', '$sessionStorage', '$rootScope'];

    function AppCtrl($state, $sessionStorage, $rootScope) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){

            });

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
