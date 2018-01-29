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
    vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    vm.data = {};
    vm.data.profile = {};
    vm.test = [1, 2];

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
      user.getCities({region: region, area: area})
        .then(function (res) {
          vm.cities = res;
          console.log(vm.cities);
          // debugger
        });

      user.getPfu({region: region})
        .then(function (res) {
          vm.pfu_code = res;
        });

      user.getDfs({region: region})
        .then(function (res) {
          vm.dfs_code = res;
        });

      user.getDfsCode({region: region})
        .then(function (res) {
          console.log(res)
          vm.dfs_code_code = res[0];
        });
    }

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

    // function citySearch(query) {
    //   vm.tempCity = '';
    //   var results = query ? vm.cityArr.filter(createFilterForCity(query)) : vm.cityArr;
    //
    //   if (results.length === 1) {
    //     vm.tempCity = results[0];
    //   }
    //
    //   if (results.length > 1) {
    //     for (var i = 0; i < results.length; i++) {
    //       if (angular.lowercase(query) === angular.lowercase(results[i].size)) {
    //         vm.tempCity = results[i];
    //       }
    //     }
    //   }
    //
    //   var deferred = $q.defer();
    //   $timeout(function () {
    //     deferred.resolve(results);
    //   }, Math.random() * 1000, false);
    //   return deferred.promise;
    // }

    function searchTextChange(text) {
      // $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      // vm.gender = item.gender;
      $log.info('Item changed to ' + JSON.stringify(item));
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


    function signup() {
      if (vm.form.$invalid) {
        return;
      }
      if (vm.data.password !== vm.password) {
        toastr.warning('Паролі не співпадають!');
        return;
      }
      vm.data.profile.city = vm.city;
      vm.data.profile.area = vm.area;
      vm.data.profile.region = vm.region;
      vm.data.profile.pfu_code = vm.pfu_codes.code;
      vm.data.profile.pfu_name = vm.pfu_codes.pfu_name;
      // vm.data.profile.city_id = vm.city.id;
      // console.log(vm.data.profile.city);
      user.signup(vm.data)
        .then(function (res) {
          toastr.success('Ви успішно зареєстровані!');
          $localStorage.token = res.token;
          delete res.token;
          $localStorage.group = res.group;
          $localStorage.id = res.user_id;
          $ionicPlatform.ready(function () {
            FCMPlugin.getToken(
              function (token) {
                $localStorage.my_notifications_id = token;
                user.device({token: token});

                console.log('Token: ' + token);
              },
              function (err) {
                alert('error retrieving token: ' + token);
                console.log('error retrieving token: ' + err);
              }
            );
          });
          $state.go('app.main');
          vm.data = {};
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
