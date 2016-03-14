/**
 * MemoryShieldStorage class - Stores game shield models
 * @constructor
 */
var MemoryShieldStorage = function() {
  this._shields = {};
  this.length = 0;
};

/**
 * Adds a shield to the internal shields handler
 * @param index
 * @param shield
 * @returns {MemoryShieldStorage}
 */
MemoryShieldStorage.prototype.add = function(index, shield) {
  this._shields[index] = shield;
  this.length++;
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
 * Gets the amount of shields loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryShieldStorage.prototype.count = function() {
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryShieldStorage;