/**
 * Factory for store api url
 */
(function () {
  'use strict';
  angular
    .module('factory.urlRequest', [])
    .factory('url', [
      function () {

        // var baseUrl = 'http://192.168.0.161:8000/api/v1/';
        var baseUrl = 'https://bukad.ga/api/v1/';
        var iPayUrl = 'https://walletmc.ipay.ua/';
        return {

          user: {
            signup:               baseUrl + 'register',
            login:                baseUrl + 'auth',
            one:                  baseUrl + 'profile',
            update:               baseUrl + 'update/profile/',
            getSignUpData:        baseUrl + 'register/data',
            getRegions:           baseUrl + 'register/regions',
            getAreas:             baseUrl + 'register/areas',
            getCities:            baseUrl + 'register/cities',
            getTopic:             baseUrl + 'register/get_kved_topic',
            getGroup:             baseUrl + 'register/get_kved_group',
            getClass:             baseUrl + 'register/get_kved_class',
            getPfu:               baseUrl + 'register/pfu',
            getDfs:               baseUrl + 'register/dfs_names',
            getDfsCode:           baseUrl + 'register/dfs',
            check:                baseUrl + 'auth/check',
            device:               baseUrl + 'auth/device',
            confirm_email:        baseUrl + 'auth/email/confirm',
            resetPassword:        baseUrl + 'auth/password/reset',
            sendCodeAgain:        baseUrl + 'auth/email/confirm/restart',
            getNotification:      baseUrl + 'messages/get'
          },

          group: {
            payFirstGroup:        baseUrl + 'single/tax/payment',
            viewTemplates:        baseUrl + 'single/tax/templates',
            getData:              baseUrl + 'employee/tax',
            getThirdTaxData:      baseUrl + 'employee/tax/requisites',
            paySecondTax:         baseUrl + 'single/social/tax/payment',
            getFirstGroupData:    baseUrl + 'single/tax/requisites',
            getSecondGroupData:   baseUrl + 'single/social/tax/requisites',
            firstTaxIncome:       baseUrl + 'single/tax',
            secondTaxIncome:      baseUrl + 'single/social/tax',
            payArmy:              baseUrl + 'army/tax/payment',
            payIncome_tax:        baseUrl + 'income/tax/payment',
            payEsv:               baseUrl + 'employee/tax/payment',
            getAllTaxes:          baseUrl + 'taxes/statuses/',
            getArmyData:          baseUrl + 'army/tax/requisites',
            getIncomeData:        baseUrl + 'income/tax/requisites',
            getEmployeeData:      baseUrl + 'employee/tax/requisites',
            getStatusWorkers:     baseUrl + '3rdtax/statuses',
            getSalary:            baseUrl + 'get/salary',
            saveWorkers:          baseUrl + 'save/salary'
          },
          iPay: {
            send:                baseUrl + 'ipay'
          }
        };
      }
    ]);
})();
