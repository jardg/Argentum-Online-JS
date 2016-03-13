/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var files = require('../../config/files.js')
  , EventManager = require('../../events/EventManager.js')
  , BufferAdapter = require('../../adapters/BufferAdapter.js')
  , Helmet = require('../../models/Helmet.js')
  , _ = require('lodash');

/**
 * Constructor for game Helmet Data Loader
 * @param game
 * @param storage
 * @constructor
 */
var BinaryHelmetLoader = function BinaryHelmetLoader(game, storage) {
  this.game = game;
  this._path = files.helmets;
  this._storage = storage;
  EventManager.eventify(this);
};

/**
 * Performs the load of all helmets binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryHelmetLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('helmets', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryHelmetLoader.prototype.process = function(key, buffer) {
  var reader = new BufferAdapter(buffer, true);
  var header = reader.skipBytes(Helmet.HEADER_SIZE);
  var count = reader.getNextInt16();

  for(var i in _.range(1, count)) {
    var helmet = new Helmet(i);
    helmet.loader.load(reader);
    this.fire('onProcessed', [helmet], this);
  }

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed helmets
 * @param helmet
 */
BinaryHelmetLoader.prototype.onProcessed = function(helmet) {
  this._storage.add(helmet.grh, helmet);
};

/**
 * Exports object constructor
 * type {Function}
 */
module.exports = BinaryHelmetLoader;