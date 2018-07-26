(function () {
  'use strict';

  angular
    .module('app')
    .controller('CreditCard', CreditCard);

  CreditCard.$inject = ['user', '$state', '$sessionStorage', '$rootScope', '$localStorage', '$window'];

  function CreditCard(user, $state, $sessionStorage, $rootScope, $localStorage, $window) {

    var vm = this;
    vm.addOneMoreCard = addOneMoreCard;
    function addOneMoreCard() {
      vm.add_data = {
        request: {
          action: 'AddcardByURL',
          body: {
            msisdn: $localStorage.mobile,
            user_id: $localStorage.id,
            lang: 'ua'
          }
        }
      };
      user.iPay(vm.add_data)
        .then(function(res){
          if(res.url) {
            $window.location.href = res.url;
          }
        });
    }
    vm.check_data = {
      request: {
        action: 'Check',
        body: {
          msisdn: $localStorage.mobile,
          user_id: $localStorage.id
        }
      }
    };
    vm.invite_data = {
      request: {
        action: 'RegisterByURL',
        body: {
          msisdn: $localStorage.mobile,
          user_id: $localStorage.id,
          lang: 'ua'
        }
      }
    };
    vm.list_data = {
      request: {
        action: 'List',
        body: {
          msisdn: $localStorage.mobile,
          user_id: $localStorage.id,
          lang: 'ua'
        }
      }
    };
    user.iPay(vm.check_data)
      .then(function (res) {
        if(res.user_status === "notexists"){
         user.iPay(vm.invite_data)
           .then(function(res){
             if(res.url) {
               $window.location.href = res.url;
             }
           });
       }
       if(res.user_status === "exists"){
         user.iPay(vm.list_data)
           .then(function (res) {
             vm.cards = res;
             console.log(vm.cards);
           });
       }
      });

    vm.cards = {
      0: {
        card_alias: 'test_card',
        mask: '569858********68',
        uid: '052',
        is_expired: 0,
        is_corporate: 0
      },
      1: {
        card_alias: 'test_card2',
        mask: '569858********78',
        uid: '012',
        is_expired: 0,
        is_corporate: 0
      }
    };
  }
})();
