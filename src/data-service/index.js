var _ = require('lodash');

/**
 * A little store of data
 * @type {Object}
 */
var dataService = {
    data: {},
    /**
     * Used for stock a variable
     * @param  {[string]} key   Key name of value
     * @param  {[array, string, object]} value The variable to store
     */
    set: function(key, value) {
        this.data[key] = value;
    },
    /**
     * Used for get a variable
     * @param  {[string]} key Key name of value
     * @return {[array, string, object, undefined]}  return the value stored or 'undefined' if not present
     */
    get: function(key) {
        if (_.isString(key)) {
            if (typeof this.data[key] !== undefined) {
                return this.data[key];
            }
        }
        return undefined;
    }
}

module.exports = dataService;