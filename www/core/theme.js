;(function () {
  'use strict';
    angular
        .module('app')
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
        	$mdThemingProvider.definePalette('amazingPaletteName', {
        	    '50':     '#039BE5',
        	    '100':    '#039BE5',
        	    '200':    '#039BE5',
        	    '300':    '#039BE5',
        	    '400':    '#039BE5',
        	    '500':    '#039BE5',
        	    '600':    '#039BE5',
        	    '700':    '#039BE5',
        	    '800':    '#039BE5',
        	    '900':    '#039BE5',
        	    'A100':   '#039BE5',
        	    'A200':   '#039BE5',
        	    'A400':   '#039BE5',
        	    'A700':   '#039BE5',
        	    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        	                                        // on this palette should be dark or light
        	    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        	        '200', '300', '400', 'A100'],
        	    'contrastLightColors': undefined    // could also specify this if default was 'dark'
        	});

        	$mdThemingProvider.definePalette('warnPalette', {
        	    '50': 'ffb199',
        	    '100': 'ff9d80',
        	    '200': 'ff8a66',
        	    '300': 'ff764d',
        	    '400': 'ff6333',
        	    '500': 'ff5722',
        	    '600': 'ff4f1a',
        	    '700': 'ff3c00',
        	    '800': 'e63600',
        	    '900': 'cc3000',
        	    'A100': 'b32a00',
        	    'A200': 'b32a00',
        	    'A400': 'b32a00',
        	    'A700': 'b32a00',
        	    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        	                                        // on this palette should be dark or light
        	    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        	        '200', '300', '400', 'A100'],
        	    'contrastLightColors': undefined    // could also specify this if default was 'dark'
        	});

        	$mdThemingProvider.definePalette('accentPalette', {
        	    '50': '424242',
        	    '100': '424242',
        	    '200': '424242',
        	    '300': '424242',
        	    '400': '424242',
        	    '500': '424242',
        	    '600': '424242',
        	    '700': '424242',
        	    '800': '424242',
        	    '900': '424242',
        	    'A100': '424242',
        	    'A200': '424242',
        	    'A400': '424242',
        	    'A700': '424242',
        	    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        	                                        // on this palette should be dark or light
        	    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        	        '200', '300', '400', 'A100'],
        	    'contrastLightColors': undefined    // could also specify this if default was 'dark'
        	});
        	$mdThemingProvider.theme('default')
        	    .primaryPalette('amazingPaletteName')
        	    .warnPalette('warnPalette')
        	    .accentPalette('accentPalette');
        }]);

})();
