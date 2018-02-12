(function () {
  'use strict';

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'group', '$localStorage', 'exit', '$translate'];

    function Main($rootScope, $state, $ionicHistory, user, $sessionStorage, group, $localStorage, exit, $translate) {

        var vm = this;
        vm.selectLanguage = selectLanguage;
        vm.user_group = $localStorage.group;
        vm.mainLanguage = $localStorage.locale;
        console.log(vm.mainLanguage);
        console.log(vm.user_group);


        // exit.buttonExit($state.current.url);


        group.getAllTaxes()
          .then(function (res) {
            vm.taxes_data = res;
          });

      activate();
      function activate() {
        selectLanguage();
      }

      function selectLanguage () {
        // $translate.use('ru');
        // $localStorage.locale = 'ru-RU';
          if(vm.mainLanguage === 'ua') {
            $translate.use('ua');
          }
          if(vm.mainLanguage === 'ru') {
            $translate.use('ru');
          }

      }

    }
})();
