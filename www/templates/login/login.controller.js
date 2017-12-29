/**
 * Controller for login page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'toastr', '$localStorage'];

    function Login($rootScope, $state, $ionicHistory, user, $sessionStorage, toastr, $localStorage) {

        $rootScope.page = {};
        var vm = this;
        vm.login = login;
        vm.signup = signup;

        function login() {
            if(!vm.data){
                toastr.warning('Будь ласка, введіть логін та пароль!');
                return;
            }
            user.login(vm.data)
                .then(function (res){
                    if(!res.token){
                        toastr.error('Невірний логін або пароль')
                    }
                    if(res.token) {
                        $localStorage.token = res.token;
                        delete res.token;
                        $sessionStorage.group = res.group;
                        $sessionStorage.id = res.user_id;
                        $state.go('app.main');
                    }
                })
        }

        function signup(){
            $state.go('signup');
        }
        function reset(){
            $state.go('password');
        }
    }
})();
