/**
 * MemoryShieldStorage class - Stores game shield models
 * @constructor
 */
var MemoryShieldStorage = function() {
  this._shields = [];
};

/**
 * Adds a shield to the internal shields handler
 * @param index
 * @param shield
 * @returns {MemoryShieldStorage}
 */
MemoryShieldStorage.prototype.add = function(index, shield) {
  this._shields.splice(index, 0, shield);
  return this;
};

/**
 * Obtains a shield from our internal shields handler
 * @param index
 * @returns {*}
 */
MemoryShieldStorage.prototype.get = function(index) {
  return this._shields[index];
};

/**
 * Returns all of the objects in the internal array
 * @returns {Array}
 */
MemoryShieldStorage.prototype.all = function() {
  return this._shields;
};

/**
 * Gets the amount of shields loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryShieldStorage.prototype.count = function() {
  return this._shields.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryShieldStorage;