/**
 * Function that runs when application start
 * it include services, factories, filters, directives modules
 */
(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'directives.module',
            'filters.module',
            'factories.module'
        ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$localStorage', '$sessionStorage', 'user', '$rootScope', '$state', '$ionicHistory'];
    function runBlock($ionicPlatform, $localStorage, $sessionStorage, user, $rootScope, $state, $ionicHistory) {

        /**
         * Function that runs when platform ready
         */

        var config = {
          apiKey: "AIzaSyCTw5jj58Md8YwrmAyqWzqFBZyVFZH_uO4",
          authDomain: "bukad-grassbusineabs.firebaseapp.com",
          databaseURL: "https://bukad-grassbusineabs.firebaseio.com",
          projectId: "bukad-grassbusineabs",
          storageBucket: "bukad-grassbusineabs.appspot.com",
          messagingSenderId: "883555529292"
        };

       var defaultApp = firebase.initializeApp(config);
      firebase.auth(defaultApp).signInAnonymously().catch(function (error) {
      });


        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if ($localStorage.auth_key) {
                $sessionStorage.auth_key = $localStorage.auth_key;
            }

            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.toState = toState.name;
                });

            /**
             * Check whether the user is authorized
             */
            if ($localStorage.token) {
              // user.check()
              //   .then(function (res){
              //     // // $rootScope.user = {
              //     // //   id: res.id,
              //     // //   group: res.group
              //     // // }
              //     //   $sessionStorage.group = res.group;
              //     //   $sessionStorage.id = res.id;
              //
              //   })
              $state.go('app.main');
            } else {
                $state.go('login');
            }

          if ($localStorage.token) {
            user.check()
              .then(function (res) {
                // $rootScope.user = res;
                $rootScope.id = res.id;
                $sessionStorage.group = res.group;
                $sessionStorage.id = res.id;

                $state.go('app.main');
              })
              .catch(function () {
                $state.go('login');
              });
          } else {
            $state.go('login');
          }

        });

    }
})();
