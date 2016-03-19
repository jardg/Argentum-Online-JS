/**
 * Node modules dependencies
 * @type {exports|module.exports}
 * @private
 */
var _ = require('lodash');

/**
 * Object constructor
 * @param id
 * @constructor
 */
var Helmet = function(id) {

  /**
   * Unique identifier of this model
   * @type {number}
   */
  this._id = id;

  /**
   * Graphic index for each of the graphics stored in this model
   * @type {{north: number, west: number, south: number, east: number}}
   */
  this.graphics = {
      north: 0
    , east: 0
    , south: 0
    , west: 0
  };

  /**
   * Internal abstracted helmet graphic loader
   *      (using hardcoded buffer loader for binary loaders)
   * @type {Helmet.BufferLoader}
   */
  this.loader = new Helmet.BufferLoader(this);
};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Helmet.HEADER_SIZE = 263;

/**
 * Fills all of the graphics in this model with the graphic
 * model stored in game's graphic storage
 * @param game
 * @self = this;self {Helmet}
 */
Helmet.prototype.loadGraphics = function(game) {
  var self = this;

  _.each(this.graphics, function(graphic, key) {
    self.graphics[key] = game.ao.storage.graphic.get(graphic);
    game.ao.managers.texture.load(graphic.grh);
  });

  return this;
};

/**
 * Helmet Buffer Loader instance
 * @param helmet
 * @constructor
 */
Helmet.BufferLoader = function(helmet) {
  this.helmet = helmet;
}

/**
 * Loads a helmet object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Helmet}
 */
Helmet.BufferLoader.prototype.load = function(reader) {
  this.helmet.graphics['north'] = reader.getNextInt16();
  this.helmet.graphics['east'] = reader.getNextInt16();
  this.helmet.graphics['south'] = reader.getNextInt16();
  this.helmet.graphics['west'] = reader.getNextInt16();
  return this.helmet;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Helmet;