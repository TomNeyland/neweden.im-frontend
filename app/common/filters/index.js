import angular from 'angular';

import DefaultFilter from './filters';

export default angular.module('common.filters', [])

.filter('default', DefaultFilter);
