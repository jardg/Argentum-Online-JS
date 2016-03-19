/**
 * Node modules dependencies
 * @type {exports|module.exports}
 * @private
 */
var _ = require('lodash')
  , Phaser = require('Phaser');

/**
 * Object constructor
 * @param id
 * @constructor
 */
var Graphic = function Graphic(id) {

  /**
   * Unique id of this model
   * @type {number}
   */
  this._id = id;

  /**
   * Graphic index number
   * @type {number}
   */
  this.number = this.grh = 0;

  /**
   * File number to obtain the graphic
   * @type {number}
   */
  this.fileNumber = 0;

  /**
   * Source offset X of the graphic in the file
   * @type {number}
   */
  this.sourceX = 0;

  /**
   * Source offset Y of the graphic in the file
   * @type {number}
   */
  this.sourceY = 0;

  /**
   * Pixel width of this graphic
   * @type {number}
   */
  this.pixelWidth = 0;

  /**
   * Pixel height of this graphic
   * @type {number}
   */
  this.pixelHeight = 0;

  /**
   * Frame data array, contains all animations frames
   * @type {Array}
   */
  this.frames = [];

  /**
   * Speed modifier of this graphic animation
   * @type {number}
   */
  this.speed = 0.0;

  /**
   * Tile width proportion between pixel width
   * and hardcoded game tile width
   * @type {number}
   */
  this.tileWidth = 0.0;

  /**
   * Tile height proportion between pixel height
   * and hardcoded game tile height
   * @type {number}
   */
  this.tileHeight = 0.0;

  /**
   * Placeholder for texture object
   * @type {*|{}|PIXI.Texture}
   */
  this.texture = {};

  /**
   * Internal abstracted graphic loader
   *      (using hardcoded buffer loader for binary loaders)
   * @type {Graphic.BufferLoader}
   */
  this.loader = new Graphic.BufferLoader(this);

};

/**
 * Tile Width in pixels
 * @type {number}
 */
Graphic.TILE_WIDTH = 32;

/**
 * Tile Height in pixels
 * @type {number}
 */
Graphic.TILE_HEIGHT = 32;

/**
 * Graphic Buffer Loader instance
 * @param graphic
 * @constructor
 */
Graphic.BufferLoader = function(graphic) {
  this.graphic = graphic;
}

/**
 * Loads a graphic object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Graphic}
 */
Graphic.BufferLoader.prototype.load = function(reader) {
  this.graphic.grh = reader.getNextInt32();
  var frames = reader.getNextInt16();

  if(frames > 1) {
    for(var i in _.range(0, frames)) {
      this.graphic.frames.push(reader.getNextInt32());
    }
    //this.graphic.speed = reader.getNextFloat32();
    reader.skipBytes(4);
    this.graphic.speed = (frames * 1000) / 60;
    return this.graphic;
  }

  this.graphic.fileNumber = reader.getNextInt32();
  this.graphic.sourceX = reader.getNextInt16();
  this.graphic.sourceY = reader.getNextInt16();
  this.graphic.pixelWidth = reader.getNextInt16();
  this.graphic.pixelHeight = reader.getNextInt16();
  this.graphic.tileWidth = this.graphic.pixelWidth / Graphic.TILE_WIDTH;
  this.graphic.tileHeight = this.graphic.pixelHeight / Graphic.TILE_HEIGHT;

  return this.graphic;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Graphic;