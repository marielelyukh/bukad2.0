(function () {
  'use strict';

  angular
    .module('app')
    .controller('Notification', Notification);

  Notification.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'group', '$localStorage', 'exit'];

  function Notification($rootScope, $state, $ionicHistory, user, $sessionStorage, group, $localStorage, exit) {

    var vm = this;
    vm.user_group = $localStorage.group;
    exit.buttonExit($state.current.url);

    console.log(vm.user_group);

    group.getAllTaxes()
      .then(function (res) {
        vm.taxes_data = res;
      });

  }
})();
