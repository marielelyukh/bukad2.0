/**
 * Factory for store api url
 */
(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                // var baseUrl = 'http://bukad.herokuapp.com/api/v1/';
                var baseUrl = 'http://46.101.242.85/api/v1/';
                return {

                    user: {
                        signup                         :  baseUrl              + 'register',
                        login                          :  baseUrl              + 'auth',
                        one                            :  baseUrl              + 'profile',
                        update                         :  baseUrl              + 'profile',
                        getSignUpData                  :  baseUrl              + 'register/data',
                        getRegions                     :  baseUrl              + 'register/regions',
                        getAreas                       :  baseUrl              + 'register/areas',
                        getCities                      :  baseUrl              + 'register/cities',
                        getTopic                       :  baseUrl              + 'register/get_kved_topic',
                        getGroup                       :  baseUrl              + 'register/get_kved_group',
                        getClass                       :  baseUrl              + 'register/get_kved_class',
                        getPfu                         :  baseUrl              + 'register/pfu',
                        getDfs                         :  baseUrl              + 'register/dfs_names',
                        getDfsCode                     :  baseUrl              + 'register/dfs'

                    },

                    group: {
                        payFirstGroup                  :  baseUrl              + 'single/tax/payment',
                        viewTemplates                  :  baseUrl              + 'single/tax/templates',
                        getData                        :  baseUrl              + 'employee/tax',
                        getThirdTaxData                :  baseUrl              + 'employee/tax/requisites',
                        // payThirdGroup               :  baseUrl              + 'employee/tax/create',
                        // viewThirdTemplate           :  baseUrl              + 'employee/tax/templates',
                        paySecondTax                   :  baseUrl              + 'single/social/tax/payment',
                        getFirstGroupData              :  baseUrl              + 'single/tax/requisites',
                        getSecondGroupData             :  baseUrl              + 'single/social/tax/requisites',
                        firstTaxIncome                 :  baseUrl              + 'single/tax',
                        secondTaxIncome                :  baseUrl              + 'single/social/tax',
                        payArmy                        :  baseUrl              + 'army/tax/payment',
                        payIncome_tax                  :  baseUrl              + 'income/tax/payment',
                        payEsv                         :  baseUrl              + 'employee/tax/payment'

                    }
                };
            }
        ]);
})();
