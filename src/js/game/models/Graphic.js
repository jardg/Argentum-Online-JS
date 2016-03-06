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
var Graphic = function(id) {
  this._id = id;
  this.grh = 0;
  this.fileNumber = 0;
  this.sourceX = 0;
  this.sourceY = 0;
  this.pixelWidth = 0;
  this.pixelHeight = 0;
  this.frames = [];
  this.speed = 0.0;
  this.tileWidth = 0.0;
  this.tileHeight = 0.0;

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