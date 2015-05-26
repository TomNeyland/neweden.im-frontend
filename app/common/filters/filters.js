function DefaultFilter() {
    return function(value, defaultValue) {
        // if the value is invalid, return the default value
        if (value === undefined || value === null) {
            return defaultValue || '-';
        }
        return value;
    };
}

DefaultFilter.$inject = [];

export default DefaultFilter;
