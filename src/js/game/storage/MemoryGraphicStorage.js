/**
 * MemoryGraphicStorage class - Stores game graphic models
 * @constructor
 */
var MemoryGraphicStorage = function() {
  this._graphics = [];
};

/**
 * Adds a graphic to the internal graphics handler
 * @param index
 * @param graphic
 * @returns {MemoryGraphicStorage}
 */
MemoryGraphicStorage.prototype.add = function(index, graphic) {
  this._graphics.splice(index, 0, graphic);
  return this;
};

/**
 * Obtains a graphic from our internal graphics handler
 * @param index
 * @returns {*}
 */
MemoryGraphicStorage.prototype.get = function(index) {
  return this._graphics[index];
};

/**
 * Gets the amount of graphics loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryGraphicStorage.prototype.count = function() {
  return this._graphics.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryGraphicStorage;