/**
 * Controller for login page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('Login', Login);

  Login.$inject = ['$translate', '$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'toastr', '$localStorage', '$ionicPlatform', 'exit'];

  function Login($translate, $rootScope, $state, $ionicHistory, user, $sessionStorage, toastr, $localStorage, $ionicPlatform, exit) {

    $rootScope.page = {};
    var vm = this;
    vm.login = login;
    vm.signup = signup;
    vm.selectLanguage = selectLanguage;
    vm.resetPass = resetPass;
    vm.AutoSave = AutoSave;
    vm.language = 'ua';
    vm.data = {};
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    exit.buttonExit($state.current.url);
    console.log($state.current.url)



    if ($localStorage.locale) {
      vm.language = $localStorage.locale;

    } else {
      vm.language = "ua";
      $localStorage.locale = "ua";
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


    activate();
    function activate() {
      selectLanguage();
    }

    if($localStorage.save) {
      vm.data = $localStorage.save;
    }

    function AutoSave() {
      if(vm.data.save) {
        $localStorage.save = {};
        $localStorage.save = vm.data;
        console.log($localStorage.save);
      }
      if(!vm.data.save) {
        delete $localStorage.save;
        console.log($localStorage.save);
      }
    }

    function resetPass() {
      $state.go('resetPassword');
    }

    function selectLanguage () {
      if(vm.language){
        $localStorage.locale = vm.language;
        if(vm.language === 'ua') {
          $translate.use('ua');

        }
        if(vm.language === 'ru') {
          $translate.use('ru');
        }
      }
    }

    function login() {
      if (vm.form.$invalid) {
        return;
      }

      user.login({email: vm.data.email, password: vm.data.password})
        .then(function (res) {
          if(res.status === 'email'){
            $state.go('confirmEmail');
            return;
          }
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

    function signup() {
      $state.go('signup');
    }

    function reset() {
      $state.go('password');
    }
  }
})();
