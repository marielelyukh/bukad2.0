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
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    function sendAgain() {
      user.sendCodeAgain({email: vm.data.email})
        .then(function (res) {

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
            $localStorage.token = res.token;
            delete res.token;
            $localStorage.group = res.group;
            $localStorage.id = res.user_id;
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
