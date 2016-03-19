/**
 * MemoryWeaponStorage class - Stores game weapon models
 * @constructor
 */
var MemoryWeaponStorage = function() {
  this._weapons = [];
};

/**
 * Adds a weapon to the internal weapons handler
 * @param index
 * @param weapon
 * @returns {MemoryWeaponStorage}
 */
MemoryWeaponStorage.prototype.add = function(index, weapon) {
  this._weapons[index] = weapon;
  return this;
};

/**
 * Returns all of the objects in the internal array
 * @returns {Array}
 */
MemoryWeaponStorage.prototype.all = function() {
  return this._weapons;
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
  return this._weapons.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryWeaponStorage;