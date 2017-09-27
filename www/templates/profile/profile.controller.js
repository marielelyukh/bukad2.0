/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Profile', Profile);

    Profile.$inject = ['$state', '$ionicHistory', '$sessionStorage', 'user'];

    function Profile($state, $ionicHistory, $sessionStorage, user) {

        var vm = this;
        vm.update = update;
        vm.user_id = $sessionStorage.id;

          user.one({user_id: vm.user_id})
              .then(function (res) {
                  vm.data = res;
              });

        function update() {
            user.update(vm.data)
                .then(function (res) {
                    vm.data = res;
                });
        }

    }
})();

