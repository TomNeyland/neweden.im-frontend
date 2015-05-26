import _ from 'lodash';

describe('karma tests with chai', function() {
    it('should expose the Chai assert method', function() {
        return assert.ok('everything', 'everything is ok');
    });
    it('should expose the Chai expect method', function() {
        return expect('foo').to.not.equal('bar');
    });
});

describe('just checking that libraries work', function() {

    it('works for lodash', function() {
        expect(_.size([1, 2, 3])).to.equal(3);
    });
});
