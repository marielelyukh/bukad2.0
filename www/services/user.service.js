/**
 * User model
 */
(function () {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage', '$ionicPopup', 'IonicClosePopupService'];

    function user(http, url, $rootScope, $sessionStorage, $state, $localStorage, $ionicPopup, IonicClosePopupService) {

        return {
            logout  : logout,
            login   : login,
            signup  : signup,
            one     : one,
            update  : update
        };

        function logout() {
            delete $sessionStorage.auth_key;
        }

        function login(data) {
            return http.post(url.user.login, data)
                .then(function (res) {
                    return res;
                });
        }


        function signup(data) {
            return http.post(url.user.signup, data)
                .then(function (res) {
                    return res;
                });
        }

        function one(data) {
            return http.get(url.user.one + '/'  + data.user_id + '/')
                .then(function (res) {
                    return res;
                });
        }

        function update(data) {
            return http.patch(url.user.update + '/'  + $sessionStorage.id + '/', data)
                .then(function (res) {
                    return res;
                });
        }




    }
})();