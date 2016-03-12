/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var files = require('../../config/files.js')
  , EventManager = require('../../events/EventManager.js')
  , BufferAdapter = require('../../adapters/BufferAdapter.js')
  , Graphic = require('../../models/Graphic.js')
  , _ = require('lodash');

/**
 * Constructor for game Graphics Data Loader
 * @param game
 * @param storage
 * @constructor
 */
var BinaryGraphicLoader = function BinaryGraphicLoader(game, storage) {
  this.game = game;
  this._path = files.graphics;
  this._storage = storage;
  EventManager.eventify(this);
};

/**
 * Performs the load of all graphics binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryGraphicLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('graphics', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryGraphicLoader.prototype.process = function(key, buffer) {
  var reader = new BufferAdapter(buffer, true);
  var header = reader.getNextInt32();
  var count = reader.getNextInt32();

  for(var i in _.range(1, count)) {
    var graphic = new Graphic(i);
    graphic.loader.load(reader);
    this.fire('onProcessed', [graphic], this);
  }

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed graphics
 * @param graphic
 */
BinaryGraphicLoader.prototype.onProcessed = function(graphic) {
  this._storage.add(graphic.grh, graphic);
};

/**
 * Exports object constructor
 * type {Function}
 */
module.exports = BinaryGraphicLoader;