/**
 * MemoryMapStorage class - Stores game map models
 * @constructor
 */
var MemoryMapStorage = function() {
  this._maps = [];
};

/**
 * Adds a map to the internal maps handler
 * @param index
 * @param map
 * @returns {MemoryMapStorage}
 */
MemoryMapStorage.prototype.add = function(index, map) {
  this._maps[index] = map;
  return this;
};

/**
 * Obtains a map from our internal maps handler
 * @param index
 * @returns {*}
 */
MemoryMapStorage.prototype.get = function(index) {
  return this._maps[index];
};

/**
 * Determines whether the given map is already loaded into storage or not
 * @param index
 * @returns {boolean}
 */
MemoryMapStorage.prototype.has = function(index) {
  return (this._maps.indexOf(index) > 0);
}

/**
 * Gets the amount of maps loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryMapStorage.prototype.count = function() {
  return this._maps.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryMapStorage;