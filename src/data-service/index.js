/**
 * A little store of data
 * @type {Object}
 */
module.exports = {
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
        if (typeof key === 'string') {
            if (typeof this.data[key] !== undefined) {
                return this.data[key];
            }
        }
        return undefined;
    },
    remove: function (key) {
        delete this.data[key];
    }
}

