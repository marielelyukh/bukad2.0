/**
 * Controller for login page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('Login', Login);

  Login.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'toastr', '$localStorage', '$ionicPlatform', 'exit'];

  function Login($rootScope, $state, $ionicHistory, user, $sessionStorage, toastr, $localStorage, $ionicPlatform, exit) {

    $rootScope.page = {};
    var vm = this;
    vm.login = login;
    vm.signup = signup;
    vm.selectLanguage = selectLanguage;
    vm.language = 'ua-UA';
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    exit.buttonExit($state.current.url);


    if ($localStorage.locale) {
      vm.language = $localStorage.locale;

    } else {
      vm.language = "ua-UA";
      $localStorage.locale = "ua-UA";
    }

    if ($localStorage.token) {
      delete $localStorage.token;
    }
    if ($localStorage.id) {
      delete $localStorage.id;
    }
    if ($localStorage.group) {
      delete $localStorage.group;
    }


    function selectLanguage () {
      // if(vm.language){
      //   $localStorage.locale = vm.language;
      //   if(vm.language === 'ua-UA') {
      //     $translate.use('ua');
      //
      //   }
      //   if(vm.language === 'ru-RU') {
      //     $translate.use('ru');
      //   }
      // }
    }

    function login() {
      if (vm.form.$invalid) {
        return;
      }
      user.login(vm.data)
        .then(function (res) {
          if (!res.token) {
            toastr.error('Невірний логін або пароль');
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

    function signup() {
      $state.go('signup');
    }

    function reset() {
      $state.go('password');
    }
  }
})();
