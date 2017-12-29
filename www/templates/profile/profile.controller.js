/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Profile', Profile);

    Profile.$inject = ['$state', '$ionicHistory', '$sessionStorage', 'user'];

    function Profile($state, $ionicHistory, $sessionStorage, user) {

        var vm = this;
        vm.update = update;
        vm.getArea = getArea;
        vm.getCities = getCities;
        vm.user_id = $sessionStorage.id;

        user.getRegions()
        .then(function (res) {
          vm.regions = res;
        });

        function getArea(region) {
        // console.log(region);
        user.getAreas({region: region})
          .then(function(res){
            vm.areas = res;
          });

      }

      function getCities(area, region) {
        // console.log(area);
        user.getCities({region: region, area: area})
          .then(function(res){
            vm.cities = res;
          });

        user.getPfu({ region: region})
          .then(function(res){
            // vm.pfu_code = res;
            vm.data.profile.pfu_code = res;
          });

        user.getDfs({ region: region})
          .then(function(res){
            // vm.pfu_code = res;
            vm.dfs_code = res;
          })

        user.getDfsCode({region: region})
          .then(function(res){
            // vm.pfu_code = res;
            vm.dfs_code_code = res[0];
          })
      }


      user.one({user_id: vm.user_id})
              .then(function (res) {
                  vm.data = res;
              });

        function update() {
            user.update(vm.data)
                .then(function (res) {
                    vm.data = res;
                });
        }

    }
})();

