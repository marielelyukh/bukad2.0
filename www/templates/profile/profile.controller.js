/**
 * Controller for profile page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('Profile', Profile);

  Profile.$inject = ['$ionicPopup', '$q', 'exit', '$timeout', '$translate', '$state', '$ionicHistory', '$sessionStorage', 'user', 'profileData', '$localStorage', 'toastr'];

  function Profile($ionicPopup, $q, exit, $timeout, $translate, $state, $ionicHistory, $sessionStorage, user, profileData, $localStorage, toastr) {

    var vm = this;
    var area;
    var dfs_name;
    var region;
    var city;
    var dfs_code;
    var pfu;
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
    vm.changePassword = false;
    vm.showDetails = false;
    vm.mainLanguage = $localStorage.locale;
    vm.user_id = $localStorage.id;
    vm.data = profileData;
    vm.region = vm.data.profile.region;
    vm.area = vm.data.profile.area;
    vm.city = vm.data.profile.city;
    vm.pfu_codes = vm.data.profile.pfu_name;
    vm.searchText = '';
    vm.searchTextRegion = '';
    vm.searchTextArea = '';
    vm.searchTextDfs = '';
    vm.searchTextDfs_code = '';
    vm.searchTextPfu = '';
    // vm.data.profile.pfu = '';
    // vm.data.profile.dfs_code = '';
    area = vm.data.profile.area;
    dfs_name = vm.data.profile.dfs_name;
    region = vm.data.profile.region;
    city = vm.data.profile.city;
    dfs_code = vm.data.profile.dfs_code;
    pfu = vm.data.profile.pfu;



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

    function selectLanguage() {
      $localStorage.locale = vm.mainLanguage;
      if (vm.mainLanguage === 'ua') {
        $translate.use('ua');
      }
      if (vm.mainLanguage === 'ru') {
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
      user.getPfu({region: vm.data.profile.region})
        .then(function (res) {
          vm.pfu_code = res;
        });

      user.getDfs({region: vm.data.profile.region})
        .then(function (res) {
          vm.dfs_codes = res;
        });

      user.getDfsCode({region: vm.data.profile.region})
        .then(function (res) {
          // console.log(res)
          vm.dfs = res;
        });
    }

    function getFirstCity() {
      user.getCities({region: vm.data.profile.region, area: vm.data.profile.area})
        .then(function (res) {
          vm.cities = res;
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
      region = item;
      console.log(item);

      user.getAreas({region: item})
        .then(function (res) {
          vm.areas = res;
          vm.data.profile.area = '';
          vm.data.profile.city = '';
        });
      user.getPfu({region: item})
        .then(function (res) {
          vm.pfu_code = res;
          vm.data.profile.pfu = '';
          pfu = '';
        });

      user.getDfs({region: item})
        .then(function (res) {
          vm.dfs_codes = res;
          vm.data.profile.dfs_name = '';
        });

      user.getDfsCode({region: item})
        .then(function (res) {
          // console.log(res)
          vm.dfs = res;
          vm.data.profile.dfs_code = '';
          dfs_code = '';
        });
    }

    function selectRegion(item, index) {
      console.log(item);
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
      if (item) {
        user.getCities({region: vm.region.region, area: item})
          .then(function (res) {
            vm.cities = res;
            area = item;
            vm.data.profile.city = '';
            console.log(vm.cities);
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
    vm.selectedItemChange = selectedItemChange;
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
    function selectedItemChange(item) {
      city = item;
      console.log(vm.city.city);
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
      dfs_name = item;
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
      // console.log(item);
      // if (Object.keys(item).length === 1) {
      //   dfs_code = item;
      // }
      if(item) {
        if(item.searchDfs_code) {
          dfs_code = item.searchDfs_code
        } else {
          dfs_code = item;
        }

      }


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
      // if (Object.keys(item).length === 1) {
      //   pfu = item;
      // }
        if(item) {
          if(item.searchPfu) {
            pfu = item.searchPfu
          } else {
            pfu = item;
          }

        }
        // if(!item){
        //   if(!item.searchPfu) {
        //     pfu = '';
        //   } else {
        //     pfu = '';
        // }
        // }
        console.log(item)
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
      var confirmPopup = $ionicPopup.confirm({
        // title: $translate.instant('SaveProfile'),
        template: $translate.instant('toMain'),
        cancelText: $translate.instant('No'),
        okText: $translate.instant('Yes')
      });
      confirmPopup.then(function (res) {
        if (res) {
          vm.data.profile.region = region;
          vm.data.profile.dfs_name = dfs_name;
          vm.data.profile.area = area;
          vm.data.profile.city = city;
          vm.data.profile.dfs_code = dfs_code;
          vm.data.profile.pfu = pfu;
          user.update(vm.data)
            .then(function (res) {
              toastr.success($translate.instant('Changes_save'));
              $localStorage.group = res.profile.group;
              $localStorage.special_status = res.profile.status;
              $localStorage.email = res.email;
              $state.go('app.main');

            });

        }
      });
    }
  }
})();

