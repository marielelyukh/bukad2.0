/**
 * Controller for signup page
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('Signup', Signup);

  Signup.$inject = ['$state', '$ionicHistory', 'user', 'toastr', '$q', '$scope', '$log', '$ionicPlatform', '$localStorage', '$timeout'];

  function Signup($state, $ionicHistory, user, toastr, $q, $scope, $log, $ionicPlatform, $localStorage, $timeout) {

    var vm = this;
    vm.signup = signup;
    // vm.search = search;
    // vm.changeCity = changeCity;
    vm.signupData = signupData;
    vm.getArea = getArea;
    vm.getCities = getCities;
    vm.getGroups = getGroups;
    vm.getClass = getClass;
    vm.filterCity = filterCity;
    vm.filterRegion = filterRegion;
    vm.filterArea = filterArea;
    vm.filterDfs = filterDfs;
    vm.filterDfs_code = filterDfs_code;
    vm.filterPfu = filterPfu;
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    vm.data = {};
    vm.data.profile = {};
    vm.test = [1, 2];
    vm.searchText = '';
    vm.searchTextRegion = '';
    vm.searchTextArea = '';
    vm.searchTextDfs = '';
    vm.searchTextDfs_code = '';
    vm.searchTextPfu = '';
    vm.data.profile.locale = $localStorage.locale;


    user.getTopic()
      .then(function (res) {
        vm.topic = res;
      });

    user.getRegions()
      .then(function (res) {
        vm.regions = res;
      });


    function getArea(region) {
      // console.log(region);
      user.getAreas({region: region})
        .then(function (res) {
          vm.areas = res;
          // vm.freeCustomersArr = vm.areas;
        });
    }

    function getGroups(topic) {
      // console.log(topic);
      user.getGroup({topic: topic})
        .then(function (res) {
          vm.groups = res;
        });
    }

    function getClass(group) {
      // console.log(topic);
      user.getClass({group: group})
        .then(function (res) {
          vm.class = res;
        });
    }

    function getCities(area, region) {
      // console.log(area);
      user.getCities({region: region.region, area: area})
        .then(function (res) {
          vm.cities = res;
          console.log(vm.cities);
          // debugger
        });

      user.getPfu({region: region.region})
        .then(function (res) {
          vm.pfu_code = res;
        });

      user.getDfs({region: region.region})
        .then(function (res) {
          vm.dfs_code = res;
        });

      user.getDfsCode({region: region.region})
        .then(function (res) {
          console.log(res)
          vm.dfs_code_code = res[0];
        });
    }


    // AUTOCOMPLETE for region STARTS


    vm.selectedItem = null;
    vm.searchRegion = [];
    vm.regionSearch = regionSearch;
    vm.searchTextRegionChange = searchTextRegionChange;
    vm.selectedRegionChange = selectedRegionChange;
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
    }

    function selectedRegionChange(item) {
      user.getAreas({region: item.region})
        .then(function (res) {
          vm.areas = res;
          // vm.freeCustomersArr = vm.areas;
        });
      // console.log(item);
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
      user.getCities({region: vm.region.region, area: item.area})
        .then(function (res) {
          vm.cities = res;
          console.log(vm.cities);
          // debugger
        });

      user.getPfu({region:  vm.region.region})
        .then(function (res) {
          vm.pfu_code = res;
        });

      user.getDfs({region:  vm.region.region})
        .then(function (res) {
          vm.dfs_codes = res;
        });

      user.getDfsCode({region:  vm.region.region})
        .then(function (res) {
          // console.log(res)
          vm.dfs = res;
        });
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



    function signup() {
      if (vm.form.$invalid) {
        return;
      }
      vm.data.profile.city = vm.city.city;
      vm.data.profile.area = vm.area.area;
      vm.data.profile.region = vm.region.region;
      user.signup(vm.data)
        .then(function (res) {
          $state.go('confirmEmail');
          toastr.success('Ви успішно зареєстровані!');

          // $localStorage.token = res.token;
          // delete res.token;
          // $localStorage.group = res.group;
          // $localStorage.id = res.user_id;
          // $ionicPlatform.ready(function () {
          //   FCMPlugin.getToken(
          //     function (token) {
          //       $localStorage.my_notifications_id = token;
          //       user.device({token: token});
          //
          //       console.log('Token: ' + token);
          //     },
          //     function (err) {
          //       alert('error retrieving token: ' + token);
          //       console.log('error retrieving token: ' + err);
          //     }
          //   );
          // });
          // $state.go('app.main');
          // vm.data = {};
        });

    }

    function signupData() {
      vm.data.profile.place = vm.map.city.description;
      user.getSignUpData({place: vm.data.profile.place})
        .then(function (res) {
          vm.data.profile.kved_code = res.kved_code;
          vm.data.profile.dfs_code = res.dfs_code;
          vm.data.profile.pfu_code = res.pfu_code;
          vm.data.profile.account = res.account;

        });

    }

    // function search(address) {
    //   var deferred = $q.defer();
    //   getResults(address).then(
    //     function (predictions) {
    //       var results = [];
    //       for (var i = 0, prediction; prediction = predictions[i]; i++) {
    //         results.push(prediction);
    //       }
    //       deferred.resolve(results);
    //     }
    //   );
    //   return deferred.promise;
    // }

    // function getResults(address) {
    //   var deferred = $q.defer();
    //   try {
    //     vm.gmapsService.getPlacePredictions({
    //       input: address,
    //       types: ['(cities)'],
    //       componentRestrictions: {country: 'ua'}
    //     }, function (data) {
    //       console.log(data);
    //       deferred.resolve(data);
    //     });
    //   } catch (e) {
    //   }
    //   return deferred.promise;
    // }

    function onSelectAddress(address, callback) {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          callback({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        }
      });
    }

    // function changeCity() {
    //   console.log('click');
    //   console.log(vm.selectedItem);
    // }
  }
})();
