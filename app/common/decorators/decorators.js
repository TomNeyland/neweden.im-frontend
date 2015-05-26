let memoized = new WeakMap();

function memoizationFor(obj) {
    let table = memoized.get(obj);

    if (!table) {
        table = Object.create(null);
        memoized.set(obj, table);
    }

    return table;
}

function memoize(target, name, descriptor) {
    let getter = descriptor.get;
    let setter = descriptor.set;

    descriptor.get = function() {
        let table = memoizationFor(this);
        if (name in table) {
            return table[name];
        }

        return table[name] = getter.call(this);
    };

    descriptor.set = function(val) {
        let table = memoizationFor(this);
        setter.call(this, val);
        table[name] = val;
    };
}

export default {
    memoize
};
