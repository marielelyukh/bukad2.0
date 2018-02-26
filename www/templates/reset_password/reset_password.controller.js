/**
 * Controller for confirmEmail page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('resetPassword', resetPassword);

  resetPassword.$inject = ['toastr', '$localStorage', '$state', 'user', 'exit'];

  function resetPassword(toastr, $localStorage, $state, user, exit) {

    var vm = this;
    vm.sendEmail = sendEmail;
    vm.language =  $localStorage.locale;
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function sendEmail() {
      if (vm.form.$invalid) {
        return;
      }
      user.resetPassword({email: vm.email, locale: vm.language})
        .then(function (res) {
          if(vm.language === 'ua'){
            toastr.success('Новий пароль надiслано на Ваш email!');
          }
          if(vm.language === 'ru'){
            toastr.success('Новый пароль отправлено на Ваш email!');
          }
            $state.go('login');
          });

    }

  }
})();
