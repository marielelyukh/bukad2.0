(function () {
    "use strict";

    angular
        .module('app')
        .controller('SingleFop', SingleFop);

    SingleFop.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', '$sessionStorage', '$stateParams', '$scope'];

    function SingleFop($rootScope, $state, $ionicHistory, user, $sessionStorage, $stateParams,  $scope) {

        var vm = this;
        vm.data = {

        };
        vm.data.receipt = true;
        vm.data.template = false;
        vm.template_data = $stateParams.template_data;
        vm.group = $stateParams.group;
        console.log($stateParams.group);
        console.log(vm.template_data);
        vm.data.user = $sessionStorage.id;

        if(vm.template_data) {
            vm.data = vm.template_data;
        }
        vm.number = 1;
        $scope.inputs = [{
            value: null
        }];

        $scope.addInput = function () {
            $scope.inputs.push({
                value: null
            });
            vm.number++;
        };

        $scope.removeInput = function (index) {
            $scope.inputs.splice(index, 1);
        };


    }
})();
