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
var Body = function(id) {

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
    , west: 0
    , south: 0
    , east: 0
  };

  /**
   * Head offset X of this body
   * @type {number}
   */
  this.headOffsetX = 0;

  /**
   * Head offset Y of this body
   * @type {number}
   */
  this.headOffsetY = 0;


  /**
   * Internal abstracted body graphic loader
   *      (using hardcoded buffer loader for binary loaders)
   * @type {Body.BufferLoader}
   */
  this.loader = new Body.BufferLoader(this);

};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Body.HEADER_SIZE = 263;

/**
 * Fills all of the graphics in this model with the graphic
 * model stored in game's graphic storage
 * @param game
 * @returns {Body}
 */
Body.prototype.loadGraphics = function(game) {
  var self = this;

  _.each(this.graphics, function(graphic, key) {
    self.graphics[key] = game.ao.storage.graphic.get(graphic);
    game.ao.managers.texture.load(graphic.grh);
  });

  return this;
};

/**
 * Body Buffer Loader instance
 * @param body
 * @constructor
 */
Body.BufferLoader = function(body) {
  this.body = body;
}

/**
 * Loads a body object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Body}
 */
Body.BufferLoader.prototype.load = function(reader) {
  this.body.graphics['north'] = reader.getNextInt16();
  this.body.graphics['east'] = reader.getNextInt16();
  this.body.graphics['south'] = reader.getNextInt16();
  this.body.graphics['west'] = reader.getNextInt16();
  this.body.headOffsetX = reader.getNextInt16();
  this.body.headOffsetY = reader.getNextInt16();

  return this.body;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Body;