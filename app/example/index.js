import angular from 'angular';
import 'angular-ui-router';

import ExampleState from './example';

export default angular.module('example', [
    'ui.router',
    'ngMaterial'
])

.config(ExampleState);
