/**
 * Factory for store api url
 */
(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                var baseUrl = 'http://192.168.0.155:8000/api/v1/';
                return {

                    user: {
                        signup        :  baseUrl + 'register',
                        login         :  baseUrl + 'auth',
                        one           :  baseUrl + 'profile',
                        update        :  baseUrl + 'profile'
                    },

                    group: {
                        payFirstGroup :  baseUrl + 'group/first/payment',
                        viewTemplates :  baseUrl + 'group/first/templates'
                    }
                };
            }
        ]);
})();
