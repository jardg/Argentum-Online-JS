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
var Head = function(id) {

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
   * Internal abstracted head graphic loader
   *      (using hardcoded buffer loader for binary loaders)
   * @type {Head.BufferLoader}
   */
  this.loader = new Head.BufferLoader(this);
};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Head.HEADER_SIZE = 263;

/**
 * Fills all of the graphics in this model with the graphic
 * model stored in game's graphic storage
 * @param game
 * @returns {Head}
 */
Head.prototype.loadGraphics = function(game) {
  var self = this;

  _.each(this.graphics, function(graphic, key) {
    self.graphics[key] = game.ao.storage.graphic.get(graphic);
    game.ao.managers.texture.load(self.graphics[key].grh);
  });

  return this;
};

/**
 * Head Buffer Loader instance
 * @param head
 * @constructor
 */
Head.BufferLoader = function(head) {
  this.head = head;
}

/**
 * Loads a head object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Head}
 */
Head.BufferLoader.prototype.load = function(reader) {
  this.head.graphics['north'] = reader.getNextInt16();
  this.head.graphics['east'] = reader.getNextInt16();
  this.head.graphics['south'] = reader.getNextInt16();
  this.head.graphics['west'] = reader.getNextInt16();
  return this.head;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Head;