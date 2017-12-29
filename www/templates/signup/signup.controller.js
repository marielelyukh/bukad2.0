/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$state', '$ionicHistory', 'user', 'toastr', '$q', '$scope', '$log'];

    function Signup($state, $ionicHistory, user, toastr, $q, $scope, $log) {

        var vm = this;
        vm.signup = signup;
        vm.search = search;
        vm.changeCity = changeCity;
        vm.signupData = signupData;
        vm.getArea = getArea;
        vm.getCities = getCities;
        vm.getGroups = getGroups;
        vm.getClass = getClass;
        // vm.citySearch = citySearch;
        // vm.searchTextChange = searchTextChange;
        // vm.selectedItemChange = selectedItemChange;
        vm.data = {};
        vm.data.profile = {};
        vm.map = {};
        vm.states        = loadAll();
        vm.selectedItem  = null;
        vm.searchText    = null;
        vm.querySearch   = querySearch;

        function querySearch (query) {
                       var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states;
                       var deferred = $q.defer();
                       $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                       return deferred.promise;
        }

        function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };
      }

      function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

        return allStates.split(/, +/g).map( function (state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      }

       //  function citySearch() {
       //   vm.tempCity = '';
       //   var results = query ? vm.grosseArr.filter(createFilterForGrosse(query)) : vm.grosseArr;
       //
       //   if(results.length === 1) {
       //     vm.tempGrosse = results[0];
       //   }
       //
       //   if(results.length > 1) {
       //     for(var i = 0; i < results.length; i++) {
       //       if(angular.lowercase(query) === angular.lowercase(results[i].size)) {
       //         vm.tempGrosse = results[i];
       //       }
       //     }
       //   }
       //   var deferred = $q.defer();
       //   $timeout(function () {
       //     deferred.resolve(results);
       //   }, Math.random() * 1000, false);
       //   return deferred.promise;
       // }


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
                .then(function(res){
                    vm.areas = res;
                });


        }

        function getGroups(topic) {
            // console.log(topic);
            user.getGroup({topic: topic})
                .then(function(res){
                    vm.groups = res;
                })
        }

        function getClass(group) {
            // console.log(topic);
            user.getClass({group: group})
                .then(function(res){
                    vm.class = res;
                })
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

        function signup() {
            vm.data.profile.city = vm.city;
            vm.data.profile.area = vm.area;
            vm.data.profile.region = vm.region;
            // vm.data.profile.city_id = vm.city.id;
            // console.log(vm.data.profile.city);
            user.signup(vm.data)
                .then(function (res) {
                    toastr.success('Ви усішно зареєстровані!');
                    $state.go('login');
                    vm.data = {};
                })

        }

        function signupData() {
            vm.data.profile.place = vm.map.city.description;
            user.getSignUpData({place: vm.data.profile.place})
                .then(function (res) {
                    vm.data.profile.kved_code = res.kved_code;
                    vm.data.profile.dfs_code  = res.dfs_code;
                    vm.data.profile.pfu_code  = res.pfu_code;
                    vm.data.profile.account   = res.account;

                })

        }
      
        function search(address) {
            var deferred = $q.defer();
            getResults(address).then(
                function (predictions) {
                    var results = [];
                    for (var i = 0, prediction; prediction = predictions[i]; i++) {
                        results.push(prediction);
                    }
                    deferred.resolve(results);
                }
            );
            return deferred.promise;
        }

        function getResults(address) {
            var deferred = $q.defer();
            try {
                vm.gmapsService.getPlacePredictions({
                    input: address,
                    types: ['(cities)'],
                    componentRestrictions: {country: 'ua'}
                }, function (data) {
                    console.log(data);
                    deferred.resolve(data);
                });
            } catch (e) {}
            return deferred.promise;
        }

        function onSelectAddress(address, callback) {
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                }
            });
        }

      // function searchTextChange(text) {
      //   // $log.info('Text changed to ' + text);
      // }
      //
      // function selectedItemChange(item) {
      //   // vm.gender = item.gender;
      //   $log.info('Item changed to ' + JSON.stringify(item));
      // }


        function changeCity(){
            console.log('click');
            console.log(vm.selectedItem);
        }
    }
})();
