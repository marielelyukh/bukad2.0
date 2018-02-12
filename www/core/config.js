(function () {
  'use strict';
  angular
    .module('app')
    .config(mainConfig);

  mainConfig.$inject = ['$translateProvider', '$stateProvider', '$urlRouterProvider', '$ionicLoadingConfig', '$ionicConfigProvider', '$mdGestureProvider'];

  /**
   * Function for configurate angular app
   */
  function mainConfig($translateProvider, $stateProvider, $urlRouterProvider, $ionicLoadingConfig, $ionicConfigProvider, $mdGestureProvider) {

    // $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $mdGestureProvider.skipClickHijack();

    /**
     * Configuring ionic loader
     */
    angular.extend($ionicLoadingConfig, {
      noBackdrop: true
    });

    /**
     * Configuring state provider
     */
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login/login.html',
        controller: 'Login',
        controllerAs: 'vm',
        cache: false
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup/signup.html',
        controller: 'Signup',
        controllerAs: 'vm'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu/menu.html',
        controller: 'AppCtrl',
        controllerAs: 'vm'
      })
      .state('confirmEmail', {
        url: '/confirm_email',
        templateUrl: 'templates/confirm_email/confirm_email.html',
        controller: 'confirmEmail',
        controllerAs: 'vm'

      })
      .state('resetPassword', {
        url: '/reset_password',
        templateUrl: 'templates/reset_password/reset_password.html',
        controller: 'resetPassword',
        controllerAs: 'vm'

      })
      .state('app.main', {
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main/main.html',
            controller: 'Main',
            controllerAs: 'vm'
          }
        },
        cache: false
      })
      .state('app.notification', {
        url: '/notification',
        views: {
          'menuContent': {
            templateUrl: 'templates/notification/notification.html',
            controller: 'Notification',
            controllerAs: 'vm'
          }
        },
        cache: false
      })
      .state('app.single_fop', {
        url: '/single_fop',
        views: {
          'menuContent': {
            templateUrl: 'templates/single_fop/single_fop.html',
            controller: 'SingleFop',
            controllerAs: 'vm'
          }
        },
        params: {
          template_data: null,
          group: null
        },
        cache: false
      })

      .state('app.single_fop_esv', {
        url: '/single_fop_esv',
        views: {
          'menuContent': {
            templateUrl: 'templates/single_fop_esv/single_fop_esv.html',
            controller: 'SingleFopE',
            controllerAs: 'vm'
          }
        },
        params: {
          template_data: null,
          group: null
        },
        cache: false
      })

      .state('app.pay_single_fop', {
        url: '/pay-single_fop',
        views: {
          'menuContent': {
            templateUrl: 'templates/pay.single_fop/pay.single_fop.html',
            controller: 'paySingleFop',
            controllerAs: 'vm'
          }
        },
        params: {
          single_fop: null,
          getter: null,
          getter_code: null,
          getter_bank: null,
          sum: null,
          appointment: null,
          for_time: null,
          data: null
        },
        cache: false
      })

      .state('app.pay_single_fop_esv', {
        url: '/pay-single_fop_esv',
        views: {
          'menuContent': {
            templateUrl: 'templates/pay.single_fop_esv/pay.single_fop_esv.html',
            controller: 'paySingleFopEsv',
            controllerAs: 'vm'
          }
        },
        params: {
          single_fop: null,
          getter: null,
          getter_code: null,
          getter_bank: null,
          sum: null,
          appointment: null,
          for_time: null,
          data: null
        },
        cache: false
      })

      .state('app.staff_tax', {
        url: '/staff_tax',
        views: {
          'menuContent': {
            templateUrl: 'templates/staff_tax/staff_tax.html',
            controller: 'staffTax',
            controllerAs: 'vm'
          }
        },
        params: {
          group: null,
          template_data: null
        }
        // cache: false
      })

      .state('app.list_of_staffTax', {
        url: '/list-of-staff-tax',
        views: {
          'menuContent': {
            templateUrl: 'templates/list_of_staffTax/list_of_staffTax.html',
            controller: 'ListOfStaffTax',
            controllerAs: 'vm'
          }
        },
        params: {
          staff_tax: null,
          values: null,
          data_salary: null,
          count_workers: null
        }
        // cache: false
      })

      .state('app.pay_staff_tax', {
        url: '/pay-staff_tax',
        views: {
          'menuContent': {
            templateUrl: 'templates/pay.staff_tax/pay.staff_tax.html',
            controller: 'payStaffTax',
            controllerAs: 'vm'
          }
        },
        params: {
          staff_tax: null,
          values: null,
          data_salary: null,
          type: null,
          title: null,
          count_workers: null
        },
        cache: false
      })


      .state('app.tax_templates', {
        url: '/tax_templates',
        views: {
          'menuContent': {
            templateUrl: 'templates/tax_templates/tax_templates.html',
            controller: 'taxTemplates',
            controllerAs: 'vm'
          }
        },
        cache: false
      })

      .state('app.profile', {
        url: '/user-profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile/profile.html',
            controller: 'Profile',
            controllerAs: 'vm'
          }},
        resolve: {
          profileData: function (user, $localStorage) {
            return user.one({
              user_id: $localStorage.id
            })
              .then(function (res) {
                return res;
              });
          }
        },
        params: {
          staff_tax: null
        },
        cache: false
      });

    $translateProvider.registerAvailableLanguageKeys(['en', 'ru', 'ua'], {
      'en-*': 'en',
      'ru-*': 'ru',
      'ua-*': 'ua'
    });

    $translateProvider.useStaticFilesLoader({
      prefix: 'data/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('ua');
    $translateProvider.useSanitizeValueStrategy(null);


    $urlRouterProvider.otherwise('/main');
  }


})();

