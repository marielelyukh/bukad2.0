/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$state', '$ionicHistory', 'user', 'toastr'];

    function Signup($state, $ionicHistory, user, toastr) {

        var vm = this;
        vm.signup = signup;
        vm.data = {};

        function signup() {
            user.signup(vm.data)
                .then(function (res) {
                    toastr.success('Ви усішно зареєстровані!');
                    $state.go('login');
                })

        }
    }
})();
