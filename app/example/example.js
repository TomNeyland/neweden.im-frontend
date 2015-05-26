import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import _ from 'lodash';


class ExampleCtrl {
    constructor(data) {
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

ExampleCtrl.$inject = ['data'];

function ExampleState($stateProvider) {
    $stateProvider.state('example', {
        controller: [
            'data',
            ExampleCtrl
        ],
        controllerAs: 'Example',
        url: '/example',
        template: require('./_example.html'),
        resolve: {
            data: [function() {
                return [1, 2, 3, 4, 5, 6];
            }]
        }
    });
}

ExampleState.$inject = ['$stateProvider'];

export default ExampleState;

export {
    ExampleCtrl
};
