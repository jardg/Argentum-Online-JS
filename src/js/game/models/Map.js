/**
 * Module dependencies
 * @type {exports|module.exports}
 * @private
 */
var _ = require('lodash');

/**
 * Map Class - Model for maps
 * @param id
 * @constructor
 */
var Map = function(id) {

  /**
   * Unique identifier for this map
   * @type {number}
   */
  this._id = id;

  /**
   * Array of tiles contained in this map
   * @type {{}}
   */
  this.tiles = [];

};

/**
 * Constant map width in tiles
 * @type {number}
 */
Map.prototype.MAP_TILE_WIDTH = 100;

/**
 * Constant map height in tiles
 * @type {number}
 */
Map.prototype.MAP_TILE_HEIGHT = 100;

/**
 * Map harcoded header size in bytes
 * @type {number}
 */
Map.prototype.HEADER_SIZE = 263 + (2 * 5);

/**
 * Map.BufferLoader Class - Exports a buffer loader class
 * in use to load binary map data into memory
 * @param map
 * @constructor
 */
Map.BufferLoader = function(map) {

  /**
   * Internally save the map instance for edition
   * @type {Map}
   */
  this.map = map;

};

/**
 * Loads an entire map data into memory from a binary
 * BufferAdapter reader object
 * @param reader
 */
Map.BufferLoader.prototype.load = function(reader) {
  reader.skipBytes(this.HEADER_SIZE);

  for(var x = 0; x < this.MAP_TILE_WIDTH; x++) {
    for(var y = 0; y < this.MAP_TILE_HEIGHT; y++) {
      
    }
  }
};

/**
 * Export this object's constructor
 * @type {Function}
 */
module.export = Map;