(function () {
  'use strict';

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$state', '$sessionStorage', '$rootScope', '$localStorage'];

    function AppCtrl($state, $sessionStorage, $rootScope, $localStorage) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;
        vm.notificationGo = notificationGo;


      $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){

            });

        function logout() {
            $state.go('login');
            delete $localStorage.token;
            delete $localStorage.id;
            delete $localStorage.email;
        }

      function notificationGo() {
        $state.go('app.notification');
      }


        function profile() {
            $state.go('app.profile');
        }
    }
})();
