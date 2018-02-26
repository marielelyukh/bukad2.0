(function () {
  'use strict';

  angular
    .module('app')
    .controller('Notification', Notification);

  Notification.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'group', '$localStorage', 'exit'];

  function Notification($rootScope, $state, $ionicHistory, user, $sessionStorage, group, $localStorage, exit) {

    var vm = this;

    user.getNotification()
      .then(function (res) {
        vm.notification_data = res;
      });

  }
})();
