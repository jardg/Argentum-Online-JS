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
 * Loads each one of this body's graphics into memory using a graphic storage
 * @param graphicStorage
 */
Body.prototype.loadGraphics = function(graphicStorage) {
  var graphicStorage = graphicStorage ||
    this.game.ao.managers.loader.get('graphic')._storage;

  _.each(this.graphics, function(graphic, key) {
    var graphic = graphicStorage.get(graphic);

    this.graphics[key] = graphic;
  });
};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Body.HEADER_SIZE = 263;

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
  this.body.loadGraphics();

  return this.body;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Body;