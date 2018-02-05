/**
 * Controller for signup page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('Profile', Profile);

  Profile.$inject = ['$timeout', '$translate', '$state', '$ionicHistory', '$sessionStorage', 'user', 'profileData', '$localStorage', 'toastr'];

  function Profile($timeout, $translate, $state, $ionicHistory, $sessionStorage, user, profileData, $localStorage, toastr) {

    var vm = this;
    vm.update = update;
    vm.getGroups = getGroups;
    vm.filterRegion = filterRegion;
    vm.filterArea = filterArea;
    vm.getClass = getClasses;
    vm.filterCity = filterCity;
    vm.filterDfs = filterDfs;
    vm.filterDfs_code = filterDfs_code;
    vm.filterPfu = filterPfu;
    vm.selectLanguage = selectLanguage;
    vm.getFirstArea = getFirstArea;
    vm.getFirstCity = getFirstCity;
    vm.mainLanguage = $localStorage.locale;
    vm.user_id = $localStorage.id;
    vm.data = profileData;
    vm.region = vm.data.profile.region;
    vm.area = vm.data.profile.area;
    vm.city = vm.data.profile.city;
    // vm.pfu_codes = vm.data.profile.pfu_name;

    vm.searchText = '';
    vm.searchTextRegion = '';
    vm.searchTextArea = '';
    vm.searchTextDfs = '';
    vm.searchTextDfs_code = '';
    vm.searchTextPfu = '';

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
    function getClasses(group) {
      user.getClass({group: group})
        .then(function (res) {
          vm.class = res;
        });
    }

    function selectLanguage () {
      // $translate.use('ru');
      $localStorage.locale = vm.mainLanguage;
      if(vm.mainLanguage === 'ua') {
        $translate.use('ua');
      }
      if(vm.mainLanguage === 'ru') {
        $translate.use('ru');
      }
    }

    activate();
    function activate() {
      getFirstArea();
      getFirstCity();
    }

    function getFirstArea() {
      user.getAreas({region: vm.data.profile.region})
        .then(function (res) {
          vm.areas = res;
          // vm.freeCustomersArr = vm.areas;
        });
      user.getPfu({region:  vm.data.profile.region})
        .then(function (res) {
          vm.pfu_code = res;
        });

      user.getDfs({region:  vm.data.profile.region})
        .then(function (res) {
          vm.dfs_codes = res;
        });

      user.getDfsCode({region:  vm.data.profile.region})
        .then(function (res) {
          // console.log(res)
          vm.dfs = res;
        });
    }

    function getFirstCity() {
      user.getCities({region: vm.data.profile.region, area: vm.data.profile.area})
        .then(function (res) {
          vm.cities = res;
          // vm.freeCustomersArr = vm.areas;
        });
    }

    // AUTOCOMPLETE for region STARTS


    vm.selectedItem = null;
    vm.searchRegion = [];
    vm.regionSearch = regionSearch;
    vm.searchTextRegionChange = searchTextRegionChange;
    vm.selectedRegionChange = selectedRegionChange;
    vm.selectRegion = selectRegion;
    vm.simulateQuery = false;
    vm.regionArr = [];
    vm.tempRegion = '';


    function regionSearch(query) {
      var results = query ? vm.regionArr.filter(createFilterForRegion(query)) : vm.regionArr,
        deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function filterRegion() {
      return vm.regions.filter(createFilterRegion);
    }

    function createFilterForRegion(query) {
      console.log('query: ' + query)
      var Query = query;

      return function filterFn(item) {
        var lowercaseQuery = angular.lowercase(query);

        return (item.size.indexOf(query) === 0);

      };
    }

    function createFilterRegion(value) {

      var reg = new RegExp(angular.lowercase(vm.searchTextRegion), 'g');

      if (angular.lowercase(value.region).match(reg)) {
        return true;
      }

      return false;
    }

    function searchTextRegionChange(text) {
      vm.searchTextRegion = text;
      console.log(vm.searchTextRegion);
    }

    function selectedRegionChange(item) {
      // vm.tmp_region = item.region;
      // vm.data.profile.area = '';
      // vm.data.profile.city = '';
      // vm.data.profile.dfs_name = '';
      // vm.data.profile.dfs_code = '';
      // vm.data.profile.pfu = '';

      console.log(item);

        user.getAreas({region: item.region})
          .then(function (res) {
            vm.areas = res;
            // vm.freeCustomersArr = vm.areas;
          });
        user.getPfu({region:  item.region})
          .then(function (res) {
            vm.pfu_code = res;
          });

        user.getDfs({region:  item.region})
          .then(function (res) {
            vm.dfs_codes = res;
          });

        user.getDfsCode({region:  item.region})
          .then(function (res) {
            // console.log(res)
            vm.dfs = res;
          });
    }

    function selectRegion(item, index) {
      console.log(item);

      // user.getAreas({region: item})
      //   .then(function (res) {
      //     vm.areas = res;
      //     // vm.freeCustomersArr = vm.areas;
      //   });
      // user.getPfu({region:  item})
      //   .then(function (res) {
      //     vm.pfu_code = res;
      //   });
      //
      // user.getDfs({region:  item})
      //   .then(function (res) {
      //     vm.dfs_codes = res;
      //   });
      //
      // user.getDfsCode({region:  item})
      //   .then(function (res) {
      //     // console.log(res)
      //     vm.dfs = res;
      //   });
    }

    // AUTOCOMPLETE for region ENDS

    // AUTOCOMPLETE for area STARTS

    vm.selectedItem = null;
    vm.searchArea = [];
    vm.areaSearch = areaSearch;
    vm.searchTextAreaChange = searchTextAreaChange;
    vm.selectedAreaChange = selectedAreaChange;
    vm.simulateQuery = false;
    vm.areaArr = [];
    vm.tempArea = '';

    function areaSearch(query) {
      var results = query ? vm.areaArr.filter(createFilterForArea(query)) : vm.areaArr,
        deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function selectedAreaChange(item) {
      // console.log(vm.region);
      if(item) {
        user.getCities({region: vm.region.region, area: item})
          .then(function (res) {
            vm.cities = res;
            console.log(vm.cities);
            // debugger
          });
      }

    }

    function filterArea() {
      return vm.areas.filter(createFilterArea);
    }

    function createFilterForArea(query) {
      console.log('query: ' + query)
      var Query = query;

      return function filterFn(item) {
        var lowercaseQuery = angular.lowercase(query);

        return (item.size.indexOf(query) === 0);

      };
    }

    function createFilterArea(value) {

      var reg = new RegExp(angular.lowercase(vm.searchTextArea), 'g');

      if (angular.lowercase(value.area).match(reg)) {
        return true;
      }

      return false;
    }

    function searchTextAreaChange(text) {
      vm.searchTextArea = text;
    }
    // AUTOCOMPLETE for area ENDS


    // AUTOCOMPLETE for city STARTS

    vm.selectedItem = null;
    vm.searchCity = [];
    vm.citySearch = citySearch;
    vm.searchTextChange = searchTextChange;
    vm.selectedCityChange = selectedCityChange;
    vm.simulateQuery = false;
    vm.cityArr = [];
    vm.tempCity = '';
    vm.cityArr = LoadAllCity();

    function citySearch(query) {
      var results = query ? vm.cityArr.filter(createFilterForCity(query)) : vm.cityArr,
        deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }


    // функция которая вызываеться при изменении инпута и присваивает новый текст в переменную
    function searchTextChange(text) {
      vm.searchText = text;

    }

    // если мы выбираем значение в предложке то функция вызываеться (но вроде и так всё работает потому что есть md-selected-item="vm.data.profile.city")
    function selectedCityChange(item) {
      // vm.data.profile.city = item;
      console.log(item);
    }

    // функция которая вызываеться что бы отфильтровать массив
    function filterCity() {
      return vm.cities.filter(createFilterFor);
    }

    // функция которая фильтрует массив (тут надо изменить value.city на нужное значение)
    function createFilterFor(value) {

      var reg = new RegExp(angular.lowercase(vm.searchText), 'g');

      if (angular.lowercase(value.city).match(reg)) {
        return true;
      }

      return false;
    }

    function LoadAllCity() {
      for (var i in vm.regions) {
        vm.cityArr[i] = {
          region: vm.regions[i].region
          // id: vm.grosse[i].id
        };
      }
      return vm.cityArr.map(function (item) {
        return {
          region: item.region
          // id: item.id
        };
      });
    }


    function createFilterForCity(query) {
      console.log('query: ' + query)
      var Query = query;

      return function filterFn(item) {
        var lowercaseQuery = angular.lowercase(query);

        return (item.size.indexOf(query) === 0);

      };
    }
    // AUTOCOMPLETE for city ENDS


    // AUTOCOMPLETE for dfs STARTS

    vm.selectedItem = null;
    vm.searchDfs = [];
    vm.dfsSearch = dfsSearch;
    vm.searchTextDfsChange = searchTextDfsChange;
    vm.selectedDfsChange = selectedDfsChange;
    vm.simulateQuery = false;
    vm.dfsArr = [];
    vm.tempDfs = '';

    function dfsSearch(query) {
      var results = query ? vm.dfsArr.filter(createFilterForDfs(query)) : vm.dfsArr,
        deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function filterDfs() {
      return vm.dfs_codes.filter(createFilterDfs);
    }

    function searchTextDfsChange(text) {
      vm.searchTextDfs = text;

    }

    function createFilterDfs(value) {

      var reg = new RegExp(angular.lowercase(vm.searchTextDfs), 'g');

      if (angular.lowercase(value).match(reg)) {
        return true;
      }

      return false;
    }

    function createFilterForDfs(query) {
      console.log('query: ' + query)
      var Query = query;

      return function filterFn(item) {
        var lowercaseQuery = angular.lowercase(query);

        return (item.size.indexOf(query) === 0);

      };
    }

    function selectedDfsChange(item) {
      console.log(item);
    }
    // AUTOCOMPLETE for dfs ENDS



    // AUTOCOMPLETE for dfs_code STARTS
    vm.selectedItem = null;
    vm.searchDfs_code = [];
    vm.dfs_codeSearch = dfs_codeSearch;
    vm.searchTextDfs_codeChange = searchTextDfs_codeChange;
    vm.selectedDfs_codeChange = selectedDfs_codeChange;
    vm.simulateQuery = false;
    vm.dfs_codeArr = [];
    vm.tempDfs_code = '';

    function dfs_codeSearch(query) {
      var results = query ? vm.dfs_codeArr.filter(createFilterForDfs_code(query)) : vm.dfs_codeArr,
        deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function filterDfs_code() {
      return vm.dfs.filter(createFilterDfs_code);
    }

    function createFilterDfs_code(value) {

      var reg = new RegExp(angular.lowercase(vm.searchTextDfs_code), 'g');

      if (angular.lowercase(value).match(reg)) {
        return true;
      }

      return false;
    }

    function createFilterForDfs_code(query) {
      console.log('query: ' + query)
      var Query = query;

      return function filterFn(item) {
        var lowercaseQuery = angular.lowercase(query);

        return (item.size.indexOf(query) === 0);

      };
    }

    function selectedDfs_codeChange(item) {
      console.log(item);
    }

    function searchTextDfs_codeChange(text) {
      vm.searchTextDfs_code = text;
    }
    // AUTOCOMPLETE for dfs_code ENDS


    // AUTOCOMPLETE for pfu STARTS

    vm.selectedItem = null;
    vm.searchPfu = [];
    vm.pfuSearch = pfuSearch;
    vm.searchTextPfuChange = searchTextPfuChange;
    vm.selectedPfuChange = selectedPfuChange;
    vm.simulateQuery = false;
    vm.pfuArr = [];
    vm.tempPfu = '';

    function pfuSearch(query) {
      var results = query ? vm.pfuArr.filter(createFilterForPfu(query)) : vm.pfuArr,
        deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function filterPfu() {
      // if(vm.searchText === '') {
      //   return vm.pfu_code;
      // }
      return vm.pfu_code.filter(createFilterPfu);
    }

    function createFilterPfu(value) {

      var reg = new RegExp(angular.lowercase(vm.searchTextPfu), 'g');

      if (angular.lowercase(value).match(reg)) {
        return true;
      }

      return false;
    }

    function createFilterForPfu(query) {
      console.log('query: ' + query)
      var Query = query;

      return function filterFn(item) {
        var lowercaseQuery = angular.lowercase(query);

        return (item.size.indexOf(query) === 0);

      };
    }

    function selectedPfuChange(item) {
      console.log(item);
    }

    function searchTextPfuChange(text) {
      vm.searchTextPfu = text;
    }
    // AUTOCOMPLETE for pfu ENDS

    function update() {
      if (vm.form.$invalid) {
        return;
      }
      vm.data.profile.locale = vm.mainLanguage;
      if(vm.data.profile.city.city){
        vm.data.profile.city = vm.data.profile.city.city;
      }
      if(vm.data.profile.area.area){
        vm.data.profile.area = vm.data.profile.area.area;
      }
      if(vm.data.profile.region.region){
        vm.data.profile.region = vm.data.profile.region.region;
      }
      user.update(vm.data)
        .then(function (res) {
          toastr.success($translate.instant('Changes_save'));
          $localStorage.group = res.profile.group;
        });
    }

  }
})();

