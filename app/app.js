import angular from 'angular';
import 'angular-ui-router';

import filtersModule from './common/filters';
import exampleModule from './example';
import chatroomModule from './chatroom';


var appModule = angular.module('app', [
    'ui.router',
    filtersModule.name,
    exampleModule.name,
    chatroomModule.name
]);


appModule.constant('version', require('../package.json').version);


appModule.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$routeChangeError', function() {
            console.log('failed to change routes', arguments);
        });
    }

]);


appModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('');
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        });
    }
]);


angular.bootstrap(document.querySelector('html'), ['app']);
