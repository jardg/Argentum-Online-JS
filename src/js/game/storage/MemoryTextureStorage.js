/**
 * MemoryTextureStorage class - Stores game texture models
 * @constructor
 */
var MemoryTextureStorage = function() {
  this._textures = [];
  this.length = 0;
};

/**
 * Adds a texture to the internal textures handler
 * @param index
 * @param texture
 * @returns {MemoryTextureStorage}
 */
MemoryTextureStorage.prototype.add = function(index, texture) {
  this._textures[index] = texture;
  this.length++;
  return this;
};

/**
 * Obtains a texture from our internal textures handler
 * @param index
 * @returns {*}
 */
MemoryTextureStorage.prototype.get = function(index) {
  return this._textures[index];
};

/**
 * Determines if the internal array buffer has a given index loaded
 * @param index
 * @returns {boolean}
 */
MemoryTextureStorage.prototype.has = function(index) {
  return (this._textures.indexOf(index) > 0);
}

/**
 * Gets the amount of textures loaded in the
 * internal grpahics array
 *
 * @returns {*}
 */
MemoryTextureStorage.prototype.count = function() {
  return this.length;
};

/**
 * Exports this module
 * @type {Function}
 */
module.exports = MemoryTextureStorage;