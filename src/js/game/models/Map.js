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
Map.MAP_TILE_WIDTH = 100;

/**
 * Constant map height in tiles
 * @type {number}
 */
Map.MAP_TILE_HEIGHT = 100;

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
  _.range('')
};

/**
 * Export this object's constructor
 * @type {Function}
 */
module.export = Map;