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
            payFirstGroup         : payFirstGroup,
            viewTemplates         : viewTemplates,
            templateDelete        : templateDelete,
            getData               : getData,
            payThirdGroup         : payThirdGroup,
            viewThirdTemplate     : viewThirdTemplate,
            templateThirdDelete   : templateThirdDelete,
            getFirstGroupData     : getFirstGroupData,
            getSecondGroupData    : getSecondGroupData,
            paySecondTax          : paySecondTax,
            firstTaxIncome        : firstTaxIncome,
            secondTaxIncome       : secondTaxIncome,
            getThirdTaxData       : getThirdTaxData,
            payEsv                : payEsv,
            payArmy               : payArmy,
            payIncome_tax         : payIncome_tax,
            getAllTaxes           : getAllTaxes
        };


        function payFirstGroup(data) {
            return http.post(url.group.payFirstGroup, data)
                .then(function (res) {
                    return res;
                });
        }

        function payArmy(data) {
            return http.post(url.group.payArmy, data)
                .then(function (res) {
                    return res;
                });
        }

      function getAllTaxes(data) {
        return http.get(url.group.getAllTaxes, data)
          .then(function (res) {
            return res;
          });
      }

        function payIncome_tax(data) {
            return http.post(url.group.payIncome_tax, data)
                .then(function (res) {
                    return res;
                });
        }

        function payEsv(data) {
            return http.post(url.group.payEsv, data)
                .then(function (res) {
                    return res;
                });
        }

        function getThirdTaxData(data) {
            return http.post(url.group.getThirdTaxData, data)
                .then(function (res) {
                    return res;
                });
        }

        function firstTaxIncome(data) {
            return http.post(url.group.firstTaxIncome, data)
                .then(function (res) {
                    return res;
                });
        }

        function secondTaxIncome(data) {
            return http.post(url.group.secondTaxIncome, data)
                .then(function (res) {
                    return res;
                });
        }

        function paySecondTax(data) {
            return http.post(url.group.paySecondTax, data)
                .then(function (res) {
                    return res;
                });
        }

        function payThirdGroup(data){
            return http.post(url.group.payThirdGroup, data)
                .then(function (res) {
                    return res;
                });
        }

        function getData(data) {
            return http.post(url.group.getData, data)
                .then(function (res) {
                    return res;
                });
        }

        function viewThirdTemplate(data) {
            return http.get(url.group.viewThirdTemplate)
                .then(function (res) {
                    return res;
                });
        }

        function getSecondGroupData(data) {
            return http.post(url.group.getSecondGroupData)
                .then(function (res) {
                    return res;
                });
        }

        function getFirstGroupData(data) {
            return http.post(url.group.getFirstGroupData)
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

        function templateThirdDelete(data) {
            return http.delete(url.group.viewSecondTemplate + '/'  + data.id + '/')
                .then(function (res) {
                    return res;
                });
        }

    }
})();
