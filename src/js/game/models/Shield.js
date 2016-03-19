/**
 * Node modules dependencies
 * @type {exports|module.exports}
 * @private
 */
var _ = require('lodash');

/**
 * Shield Class - Shield model
 * @param id
 * @constructor
 */
var Shield = function(id) {

  /**
   * Unique identifier of this model
   * @type {number}
   */
  this._id = id;

  /**
   * Graphic index for each of the graphics stored in this model
   * @type {{north: number, west: number, south: number, east: number}}
   */
  this.graphics =
  {   north: 0
    , east: 0
    , south: 0
    , west: 0
  };

  /**
   * Internal abstracted shield graphic loader
   *      (using hardcoded buffer loader for binary loaders)
   * @type {Shield.BufferLoader}
   */
  this.loader = new Shield.BufferLoader(this);
};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Shield.HEADER_SIZE = 263;

/**
 * Fills all of the graphics in this model with the graphic
 * model stored in game's graphic storage
 * @param game
 * @returns {Shield}
 */
Shield.prototype.loadGraphics = function(game) {
  var self = this;

  _.each(this.graphics, function(graphic, key) {
    self.graphics[key] = game.ao.storage.graphic.get(graphic);
    game.ao.managers.texture.load(self.graphics[key].grh);
  });

  return this;
};

/**
 * Shield Buffer Loader instance
 * @param shield
 * @constructor
 */
Shield.BufferLoader = function(shield) {
  this.shield = shield;
}

/**
 * Loads a shield object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Shield}
 */
Shield.BufferLoader.prototype.load = function(reader) {
  var shieldKey = 'ESC' + this.shield._id;
  if(!reader.hasOwnProperty(shieldKey)) return this.shield;

  this.shield.graphics['north'] = parseInt(reader[shieldKey]['Dir1']);
  this.shield.graphics['east'] = parseInt(reader[shieldKey]['Dir2']);
  this.shield.graphics['south'] = parseInt(reader[shieldKey]['Dir3']);
  this.shield.graphics['west'] = parseInt(reader[shieldKey]['Dir4']);

  return this.shield;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Shield;