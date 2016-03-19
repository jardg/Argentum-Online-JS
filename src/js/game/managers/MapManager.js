/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var config = require('../config/maps.js')
  , _ = require('lodash');

/**
 * MapManager class - Loads all assets from a configuration file
 * @param game
 * @constructor
 */
var MapManager = function(game) {

  // Not sure why it doesn't work up there
  var config = require('../config/maps.js');

  /**
   * Stores PhaserJS Game Instance
   * @type Phaser
   */
  this.game = game;

  /**
   * Instantiates storage for maps into this manager
   * @type {MemoryMapStorage}
   */
  this.storage = new config.storage();

  /**
   * Instantiates loader for maps into this manager
   * @type {BinaryMapLoader}
   */
  this.loader = new config.loader(this.game, this.storage, config.path);

};

/**
 * Loads a given map using a given map id {map}
 * @param map - Integer identifier of the map to load
 * @param cb - Listener for when a map is loaded into memory
 * @returns {MapManager}
 */
MapManager.prototype.load = function(map, cb) {
  try {
    this.loader.addListener('onLoaded', cb);
    this.loader.load(map, function(map) {
      console.info('[managers/MapManager.js]: Successfully loaded map with ID [' + map.number + ']');
    });
  } catch(err) {
    console.error('[managers/MapManager.js]: Map with ID [' + map + '] failed to load: ' + err.message);
  }

  return this;
};

/**
 * Export this module definition
 * @type {Function}
 */
module.exports = MapManager;