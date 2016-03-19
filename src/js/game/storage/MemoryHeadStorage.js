/**
 * MemoryHeadStorage class - Stores game head models
 * @constructor
 */
var MemoryHeadStorage = function() {
  this._heads = [];
};

/**
 * Adds a head to the internal heads handler
 * @param index
 * @param head
 * @returns {MemoryHeadStorage}
 */
MemoryHeadStorage.prototype.add = function(index, head) {
  this._heads.splice(index, 0, head);
  return this;
};

/**
 * Returns all of the objects in the internal array
 * @returns {Array}
 */
MemoryHeadStorage.prototype.all = function() {
  return this._heads;
};

/**
 * Obtains a head from our internal heads handler
 * @param index
 * @returns {*}
 */
MemoryHeadStorage.prototype.get = function(index) {
  return this._heads[index];
};

/**
 * Gets the amount of heads loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryHeadStorage.prototype.count = function() {
  return this._heads.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryHeadStorage;