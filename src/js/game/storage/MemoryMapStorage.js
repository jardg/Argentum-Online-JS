/**
 * MemoryMapStorage class - Stores game map models
 * @constructor
 */
var MemoryMapStorage = function() {
  this._maps = {};
  this.length = 0;
};

/**
 * Adds a map to the internal maps handler
 * @param index
 * @param map
 * @returns {MemoryMapStorage}
 */
MemoryMapStorage.prototype.add = function(index, map) {
  this._maps[index] = map;
  this.length++;
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
 * Gets the amount of maps loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryMapStorage.prototype.count = function() {
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryMapStorage;