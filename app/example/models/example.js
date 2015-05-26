import _ from 'lodash';

import {memoize} from 'common/decorators';

class Foo {
    constructor(data) {
        _.extend(this, _.omit(data, '$$hashKey'));
    }

    @memoize
    get name() {
        return `${this.first} ${this.last}`;
    }

    set name(val) {
        let [first, last] = val.split(' ');
        this.first = first;
        this.last = last;
    }
}

export default Foo;
