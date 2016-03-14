/**
 * MemoryWeaponStorage class - Stores game weapon models
 * @constructor
 */
var MemoryWeaponStorage = function() {
  this._weapons = {};
  this.length = 0;
};

/**
 * Adds a weapon to the internal weapons handler
 * @param index
 * @param weapon
 * @returns {MemoryWeaponStorage}
 */
MemoryWeaponStorage.prototype.add = function(index, weapon) {
  this._weapons[index] = weapon;
  this.length++;
  return this;
};

/**
 * Obtains a weapon from our internal weapons handler
 * @param index
 * @returns {*}
 */
MemoryWeaponStorage.prototype.get = function(index) {
  return this._weapons[index];
};

/**
 * Gets the amount of weapons loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryWeaponStorage.prototype.count = function() {
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryWeaponStorage;