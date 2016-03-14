/**
 * MemoryHeadStorage class - Stores game head models
 * @constructor
 */
var MemoryHeadStorage = function() {
  this._heads = {};
  this.length = 0;
};

/**
 * Adds a head to the internal heads handler
 * @param index
 * @param head
 * @returns {MemoryHeadStorage}
 */
MemoryHeadStorage.prototype.add = function(index, head) {
  this._heads[index] = head;
  this.length++;
  return this;
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
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryHeadStorage;