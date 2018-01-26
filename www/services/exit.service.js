;(function () {
  'use strict';

  angular
    .module('model.exit', [])
    .service('exit', exit);

  exit.$ingect = ['$ionicPlatform', '$ionicPopup', '$state'];

  function exit($ionicPlatform, $ionicPopup, $state) {
    return {
      buttonExit: buttonExit
    };

    function buttonExit(location) {
      $ionicPlatform.registerBackButtonAction(function () {
        if ($state.current.url === location) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Вийти',
            template: 'Ви дiйсно бажаєте вийти?',
            cancelText: 'Нi',
            okText: 'Так'
          });
          confirmPopup.then(function (res) {
            if (res) {
              event.preventDefault();
              navigator.app.exitApp();

            }
          });
        } else {
          window.history.back();
        }
      }, 100);
    }
  }
})();
