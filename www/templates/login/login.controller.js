/**
 * Controller for login page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', 'toastr', '$localStorage', '$ionicPlatform'];

    function Login($rootScope, $state, $ionicHistory, user, $sessionStorage, toastr, $localStorage, $ionicPlatform) {

        $rootScope.page = {};
        var vm = this;
        vm.login = login;
        vm.signup = signup;

        if($localStorage.token) {
          delete $localStorage.token;
        }


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
                          }
                        );
                      });
                        $state.go('app.main');


                    }
                });
        }

        function signup(){
            $state.go('signup');
        }
        function reset(){
            $state.go('password');
        }
    }
})();
