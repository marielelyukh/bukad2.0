/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$state', '$ionicHistory', 'user', 'toastr', '$q', '$scope'];

    function Signup($state, $ionicHistory, user, toastr, $q, $scope) {

        var vm = this;
        vm.signup = signup;
        vm.search = search;
        vm.changeCity = changeCity;
        vm.signupData = signupData;
        vm.getArea = getArea;
        vm.getCities = getCities;
        vm.getGroups = getGroups;
        vm.getClass = getClass;
        vm.data = {};
        vm.data.profile = {};
        vm.map = {};
        // vm.gmapsService = new google.maps.places.AutocompleteService();

            user.getTopic()
                .then(function (res) {
                    vm.topic = res;
                });

            user.getRegions()
            .then(function (res) {
                vm.regions = res;
            });

            // user.getSignUpData()
            // .then(function (res) {
            //     // vm.regions = res;
            //     vm.data.profile.dfs_code  = res.dfs_code;
            //     // vm.pfu_code  = res.pfu_code;
            // });


        function getArea(region) {
            // console.log(region);
            user.getAreas({id: region.id, name: region.name})
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

        function getCities(region) {
            // console.log(area);
            user.getCities({region: region})
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
            vm.data.profile.city = vm.region +  ',' + vm.city;
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


        function changeCity(){
            console.log('click');
            console.log(vm.selectedItem);
        }
    }
})();
