/**
 * MemoryBodyStorage class - Stores game body models
 * @constructor
 */
var MemoryBodyStorage = function() {
  this._bodies = {};
  this.length = 0;
};

/**
 * Adds a body to the internal bodies handler
 * @param index
 * @param body
 * @returns {MemoryBodyStorage}
 */
MemoryBodyStorage.prototype.add = function(index, body) {
  this._bodies[index] = body;
  this.length++;
  return this;
};

/**
 * Obtains a body from our internal bodies handler
 * @param index
 * @returns {*}
 */
MemoryBodyStorage.prototype.get = function(index) {
  return this._bodies[index];
};

/**
 * Gets the amount of bodies loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryBodyStorage.prototype.count = function() {
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryBodyStorage;