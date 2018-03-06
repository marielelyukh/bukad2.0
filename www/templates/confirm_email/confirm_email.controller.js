/**
 * Controller for confirmEmail page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('confirmEmail', confirmEmail);

  confirmEmail.$inject = ['$translate', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'toastr', '$localStorage', '$ionicPlatform', 'exit'];

  function confirmEmail($translate, $rootScope, $state, $ionicHistory, user, $sessionStorage, toastr, $localStorage, $ionicPlatform, exit) {

    var vm = this;
    vm.confirmEmail = confirmEmail;
    vm.sendAgain = sendAgain;
    vm.data = {};
    vm.data.email = $sessionStorage.email;
    vm.language =  $localStorage.locale;
    vm.data.password = $sessionStorage.password;

    function sendAgain() {
      user.sendCodeAgain({email: vm.data.email})
        .then(function (res) {
          if(vm.language === 'ua'){
            toastr.success('Новий код надiслано на Ваш email!');
          }
          if(vm.language === 'ru'){
            toastr.success('Новый код отправлено на Ваш email!');
          }
        });
    }


    function confirmEmail() {
      if (vm.form.$invalid) {
        return;
      }
      user.confirm_email(vm.data)
        .then(function (res) {
          if (!res.token) {
            toastr.error($translate.instant('InvalidLogin'));
          }
          if (res.token) {
            delete $sessionStorage.email;
            delete $sessionStorage.password;
            $localStorage.token = res.token;
            delete res.token;
            $localStorage.group = res.group;
            $localStorage.id = res.user_id;
            $localStorage.special_status = res.special_status;
            $localStorage.email = res.email;
            $ionicPlatform.ready(function () {
              FCMPlugin.getToken(
                function (token) {
                  $localStorage.my_notifications_id = token;
                  user.device({token: token});

                  console.log('Token: ' + token);
                },
                function (err) {
                  alert('error retrieving token: ' + token);
                  console.log('error retrieving token: ' + err);
                });
              FCMPlugin.onNotification(function (data) {
                if(data.message) {
                  $state.go('app.notification');
                }
              });

            });
            $state.go('app.main');



          }
        });
    }

  }
})();
