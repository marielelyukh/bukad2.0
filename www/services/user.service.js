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
            logout        : logout,
            login         : login,
            signup        : signup,
            one           : one,
            update        : update,
            getSignUpData : getSignUpData,
            getRegions    : getRegions,
            getCities     : getCities,
            getAreas      : getAreas,
            getTopic      : getTopic,
            getGroup      : getGroup,
            getClass      : getClass,
            getPfu        : getPfu,
            getDfs        : getDfs,
            getDfsCode    : getDfsCode,
            check         : check,
            device        : device


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

      function device(data) {
        return http.post(url.user.device, data)
          .then(function (res) {
            return res;
          });
      }

      function check(data) {
        return http.get(url.user.check, data)
          .then(function (res) {
            return res;
          });
      }

        function getDfsCode(data) {
            return http.post(url.user.getDfsCode, data)
                .then(function (res) {
                    return res;
                });
        }


        function getPfu(data) {
            return http.post(url.user.getPfu, data)
                .then(function (res) {
                    return res;
                });
        }

        function getDfs(data) {
            return http.post(url.user.getDfs, data)
                .then(function (res) {
                    return res;
                });
        }

        function getRegions(data) {
            return http.post(url.user.getRegions, data)
                .then(function (res) {
                    return res;
                });
        }

        function getAreas(data) {
            return http.post(url.user.getAreas, data)
                .then(function (res) {
                    return res;
                });
        }

        function getCities(data) {
            return http.post(url.user.getCities, data)
                .then(function (res) {
                    return res;
                });
        }

        function getTopic(data) {
            return http.post(url.user.getTopic, data)
                .then(function (res) {
                    return res;
                });
        }

        function getGroup(data) {
            return http.post(url.user.getGroup, data)
                .then(function (res) {
                    return res;
                });
        }

        function getClass(data) {
            return http.post(url.user.getClass, data)
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

        function getSignUpData(data) {
            return http.post(url.user.getSignUpData, data)
                .then(function (res) {
                    return res;
                });
        }




    }
})();
