;(function () {
  'use strict';

  angular
    .module('model.exit', [])
    .service('exit', exit);

  exit.$ingect = ['$localStorage', '$ionicHistory', '$translate', '$ionicPlatform', '$ionicPopup', '$state'];

  function exit($localStorage, $ionicHistory, $translate, $ionicPlatform, $ionicPopup, $state) {
    return {
      buttonExit: buttonExit,
      buttonBack: buttonBack,
      buttonMain: buttonMain,
      buttonMenu: buttonMenu
    };

    function buttonExit(location) {
      $ionicPlatform.registerBackButtonAction(function () {
        if ($state.current.url === location) {
          var confirmPopup = $ionicPopup.confirm({
            title: $translate.instant('LogOut'),
            template: $translate.instant('ReallyLogOut'),
            cancelText: $translate.instant('No'),
            okText: $translate.instant('Yes')
          });
          confirmPopup.then(function (res) {
            if (res) {
              event.preventDefault();
              navigator.app.exitApp();

            }

          });
        }

      }, 100);
    }

    function buttonBack(location) {
      $ionicPlatform.registerBackButtonAction(function () {
        if ($state.current.url === location) {
          $ionicHistory.goBack();
          // window.history.back();
        }
      }, 100);

    }

    function buttonMain(location) {
      $ionicPlatform.registerBackButtonAction(function () {
        if ($state.current.url === location) {
          window.history.back();
        }
      }, 100);

    }

    function buttonMenu(location) {
      $ionicPlatform.registerBackButtonAction(function () {
        if ($state.current.url === location) {
          $localStorage.menuLocation = 1;
          // window.history.back();
        }
      }, 100);

    }
  }
})();
