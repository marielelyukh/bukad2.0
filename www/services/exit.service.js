;(function () {
  'use strict';

  angular
    .module('model.exit', [])
    .service('exit', exit);

  exit.$ingect = ['$localStorage', '$ionicHistory', '$translate', '$ionicPlatform', '$ionicPopup', '$state'];

  function exit($localStorage, $ionicHistory, $translate, $ionicPlatform, $ionicPopup, $state) {
    return {
      buttonExit: buttonExit,

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

            } else {
              $state.go('app.main')
            }

          });
        }

      }, 100);
    }





  }
})();
