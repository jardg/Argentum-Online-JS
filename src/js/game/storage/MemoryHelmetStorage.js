/**
 * MemoryHelmetStorage class - Stores game helmet models
 * @constructor
 */
var MemoryHelmetStorage = function() {
  this._helmets = [];
};

/**
 * Adds a helmet to the internal helmets handler
 * @param index
 * @param helmet
 * @returns {MemoryHelmetStorage}
 */
MemoryHelmetStorage.prototype.add = function(index, helmet) {
  this._helmets.splice(index, 0, helmet);
  return this;
};

/**
 * Returns all of the objects in the internal array
 * @returns {Array}
 */
MemoryHelmetStorage.prototype.all = function() {
  return this._helmets;
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
  return this._helmets.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryHelmetStorage;