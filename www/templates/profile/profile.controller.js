/**
 * Controller for signup page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('Profile', Profile);

  Profile.$inject = ['$state', '$ionicHistory', '$sessionStorage', 'user', 'profileData', '$localStorage', 'toastr'];

  function Profile($state, $ionicHistory, $sessionStorage, user, profileData, $localStorage, toastr) {

    var vm = this;
    vm.update = update;
    vm.getArea = getArea;
    vm.getCities = getCities;
    vm.getClass = getClasses;
    vm.getGroups = getGroups;
    vm.user_id = $localStorage.id;
    vm.data = profileData;
    vm.pfu_codes = vm.data.profile.pfu_name;
    vm.getFirstArea = getFirstArea;

    user.getRegions()
      .then(function (res) {
        vm.regions = res;
      });

    user.getTopic()
      .then(function (res) {
        vm.topic = res;
      });

    function getGroups(topic) {
      user.getGroup({topic: topic})
        .then(function (res) {
          vm.groups = res;
        });
    }

    function getArea(region) {
      console.log(region);
      user.getAreas({region: region})
        .then(function (res) {
          vm.areas = res;
        });
    }

    function getClasses(group) {
      user.getClass({group: group})
        .then(function (res) {
          vm.class = res;
        });
    }

    function getFirstArea() {
      console.log(vm.data.profile);
    }

    function getCities(area, region) {
      user.getCities({region: region, area: area})
        .then(function (res) {
          vm.cities = res;
        });

      user.getPfu({region: region})
        .then(function (res) {
          // vm.pfu_code = res;
          vm.pfu_code = res;
        });


      user.getDfs({region: region})
        .then(function (res) {
          vm.dfs_organization = res;
        })

      user.getDfsCode({region: region})
        .then(function (res) {
          vm.dfs_code= res[0];
        });
    }


    function update() {
      if (vm.form.$invalid) {
        return;
      }
      // if (vm.data.password !== vm.password) {
      //   toastr.warning('Паролі не співпадають!');
      //   return;
      // }
      // vm.data.profile.pfu_code = vm.pfu_codes.code;
      // vm.data.profile.pfu_name = vm.pfu_codes.pfu_name;
      user.update(vm.data)
        .then(function (res) {
          toastr.success('Змiни збережено!');
          $localStorage.group = res.profile.group;
        });
    }

  }
})();

