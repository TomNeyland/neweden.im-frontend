import {ExampleCtrl} from './example';
import './index';

describe('Example module', function() {
    var $controllerProvider, scope = {}, $rootScope, $controller;

    beforeEach(angular.mock.module('example'));

    beforeEach(angular.mock.module(function(_$controllerProvider_) {
        $controllerProvider = _$controllerProvider_;
    }));

    describe('Help controller', function() {

        beforeEach(angular.mock.inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $controllerProvider.register('ExampleCtrl', ExampleCtrl);

            scope = $rootScope.$new();

            $controller('ExampleCtrl as Example', {
                $scope: scope,
                data: [1, 2, 3, 4, 5, 6]
            });
        }));

        it('should load example data', function() {
            expect(scope.Example.exampleData).to.not.be.undefined;
        });

        it('should load example data as an array', function() {
            expect(scope.Example.exampleData).to.be.an('array');
        });

        it('should have a property called data that returns exampleData', function() {
            expect(scope.Example.data).to.be.an('array');
            expect(scope.Example.data).to.deep.equal(scope.Example.exampleData);
        });

        it('should have a method called someMethod that returns the double for each value', function() {
            expect(scope.Example.someMethod()).to.deep.equal([2, 4, 6, 8, 10, 12]);
        });
    });
});
