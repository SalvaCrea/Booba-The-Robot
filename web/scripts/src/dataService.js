import _ from 'lodash'

var dataService = {
    data: {},
    set: function(key, value) {
        this.data[key] = value;
    },
    get: function(key) {
        if (_.isString(key)) {
            if (typeof this.data[key] !== undefined) {
                return this.data[key];
            }
        }
        return undefined;
    }
}

export default dataService;