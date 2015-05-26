import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import angular from 'angular';
import _ from 'lodash';

/*
	Module Definition
 */

const exampleModule = angular.module('example', [
    'ui.router',
    'ngMaterial'
]);


/*
	Controller Definitions
 */

class ExampleCtrl {
    constructor($scope, data) {
        this.exampleData = data;
    }

    someMethod() {
        return _.map(this.exampleData, function(data) {
            return (data * 2);
        });
    }

    get data() {
        return this.exampleData;
    }
}

ExampleCtrl.$inject = ['$scope', 'data'];


/*
	Controller Registration
*/

exampleModule.controller('ExampleCtrl', ExampleCtrl);


/*
	State definitions
 */

exampleModule.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('example', {
        controller: 'ExampleCtrl',
        controllerAs: 'Example',
        url: '/example',
        template: require('./_example.html'),
        resolve: {
            data: [function() {
                return [1, 2, 3, 4, 5, 6];
            }]
        }
    });
}]);


// Export the module
export default exampleModule;