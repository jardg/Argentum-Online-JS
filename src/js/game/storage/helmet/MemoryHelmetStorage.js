/**
 * MemoryHelmetStorage class - Stores game helmet models
 * @constructor
 */
var MemoryHelmetStorage = function() {
  this._helmets = {};
  this.length = 0;
};

/**
 * Adds a helmet to the internal helmets handler
 * @param index
 * @param helmet
 * @returns {MemoryHelmetStorage}
 */
MemoryHelmetStorage.prototype.add = function(index, helmet) {
  this._helmets[index] = helmet;
  this.length++;
  return this;
};

/**
 * Obtains a helmet from our internal helmets handler
 * @param index
 * @returns {*}
 */
MemoryHelmetStorage.prototype.get = function(index) {
  return this._helmets[index];
};

/**
 * Gets the amount of helmets loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryHelmetStorage.prototype.count = function() {
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryHelmetStorage;