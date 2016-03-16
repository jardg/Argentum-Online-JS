/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var loaders = require('../config/loaders.js')
  , EventManager = require('../managers/EventManager.js')
  , BufferAdapter = require('../adapters/BufferAdapter.js')
  , Map = require('../models/Map.js')
  , _ = require('lodash');

/**
 * Constructor for game Map Data Loader
 * @param game
 * @param storage
 * @param path
 * @constructor
 */
var BinaryMapLoader = function BinaryMapLoader(game, storage, path) {
  this.game = game;
  this._path = path || loaders.map.path;
  this._storage = storage;
  EventManager.eventify(this);
};

/**
 * Performs the load of all maps binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryMapLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('maps', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryMapLoader.prototype.process = function(key, buffer) {
  var reader = new BufferAdapter(buffer, true);
  var header = reader.getNextInt32();
  var count = reader.getNextInt32();

  for(var i in _.range(1, count)) {
    var map = new Map(i);
    map.loader.load(reader);
    this.fire('onProcessed', [map], this);
  }

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed maps
 * @param map
 */
BinaryMapLoader.prototype.onProcessed = function(map) {
  this._storage.add(map.grh, map);
};

/**
 * Exports object constructor
 * type {Function}
 */
module.exports = BinaryMapLoader;