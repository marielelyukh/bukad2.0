/**
 * User model
 */
(function () {
    'use strict';

    angular
        .module('model.group', [])
        .service('group', group);

    group.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage', '$ionicPopup', 'IonicClosePopupService'];

    function group(http, url, $rootScope, $sessionStorage, $state, $localStorage, $ionicPopup, IonicClosePopupService) {

        return {
            payFirstGroup: payFirstGroup,
            viewTemplates: viewTemplates,
            templateDelete: templateDelete
        };


        function payFirstGroup(data) {
            return http.post(url.group.payFirstGroup, data)
                .then(function (res) {
                    return res;
                });
        }

        function viewTemplates(data) {
            return http.get(url.group.viewTemplates)
                .then(function (res) {
                    return res;
                });
        }

        function templateDelete(data) {
            return http.delete(url.group.viewTemplates + '/'  + data.id + '/')
                .then(function (res) {
                    return res;
                });
        }

    }
})();
