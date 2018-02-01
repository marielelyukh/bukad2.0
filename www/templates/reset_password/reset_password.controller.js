/**
 * Controller for confirmEmail page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('resetPassword', resetPassword);

  resetPassword.$inject = ['$state', 'user', 'exit'];

  function resetPassword($state, user, exit) {

    var vm = this;
    vm.sendEmail = sendEmail;
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function sendEmail() {
      if (vm.form.$invalid) {
        return;
      }
      user.resetPassword(vm.email)
        .then(function (res) {
            $state.go('login');
          });

    }

  }
})();
