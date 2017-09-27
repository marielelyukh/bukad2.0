(function () {
    "use strict";

    angular
        .module('app')
        .controller('taxTemplates', taxTemplates);

    taxTemplates.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', 'group', '$sessionStorage'];

    function taxTemplates($rootScope, $state, $ionicHistory, user, group, $sessionStorage) {

        var vm = this;
        vm.templateDelete = templateDelete;
        vm.user_id = $sessionStorage.id;

        group.viewTemplates({user_id: vm.user_id})
            .then(function (res) {
                vm.templates = res;
            });

        function templateDelete(id) {
            group.templateDelete({id: id})
                .then(function (res) {
                    if (res) {
                        vm.templates = vm.templates.filter(function (item) {
                            return item.id != id;
                        });
                    }
                });
        }

    }
})();

