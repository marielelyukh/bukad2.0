/**
 * Controller for signup page
 */
(function () {
  "use strict";

  angular
    .module('app')
    .controller('Profile', Profile);

  Profile.$inject = ['$state', '$ionicHistory', '$sessionStorage', 'user', 'profileData'];

  function Profile($state, $ionicHistory, $sessionStorage, user, profileData) {

    var vm = this;
    vm.update = update;
    vm.getArea = getArea;
    vm.getCities = getCities;
    vm.getClass = getClasses;
    vm.getGroups = getGroups;
    vm.user_id = $sessionStorage.id;
    vm.data = profileData;
    vm.pfu_codes = vm.data.profile.pfu_name;
    vm.getFirstArea = getFirstArea;

    console.log('masha', vm.data);
    // user.one({user_id: vm.user_id})
    // .then(function (res) {
    //   vm.data = res;
    // });
    user.getRegions()
      .then(function (res) {
        vm.regions = res;
      });

    user.getTopic()
      .then(function (res) {
        vm.topic = res;
      });

    //   active();
    //    function active() {
    //    getFirstArea();
    // }

    function getGroups(topic) {
      // console.log(topic);
      user.getGroup({topic: topic})
        .then(function (res) {
          vm.groups = res;
        })
    }

    function getArea(region) {
      console.log(region);
      user.getAreas({region: region})
        .then(function (res) {
          vm.areas = res;
        });
    }

    function getClasses(group) {
      // console.log(topic);
      user.getClass({group: group})
        .then(function (res) {
          vm.class = res;
        })
    }

    function getFirstArea() {
      console.log(vm.data.profile)
      // user.getAreas({region: vm.data.profile.region})
      //   .then(function(res){
      //     vm.areas = res;
      //   });

    }

    function getCities(area, region) {
      // console.log(area);
      user.getCities({region: region, area: area})
        .then(function (res) {
          vm.cities = res;
        });

      user.getPfu({area: area})
        .then(function (res) {
          // vm.pfu_code = res;
          vm.pfu_code = res;
        });


      user.getDfs({region: region})
        .then(function (res) {
          // vm.pfu_code = res;
          vm.dfs_code = res;
        })

      user.getDfsCode({region: region})
        .then(function (res) {
          // vm.pfu_code = res;
          vm.dfs_code_code = res[0];
        })
    }


    function update() {
      if (vm.data.password !== vm.password) {
        toastr.warning('Паролі не співпадають!');
        return;
      }
      vm.data.profile.pfu_code = vm.pfu_codes.code;
      vm.data.profile.pfu_name = vm.pfu_codes.pfu_name;
      user.update(vm.data)
        .then(function (res) {
          toastr.success('Змiни збережено!')
          // vm.data = res;
        });
    }

  }
})();

