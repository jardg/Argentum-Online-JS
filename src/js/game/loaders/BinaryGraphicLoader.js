/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var EventManager = require('../managers/EventManager.js')
  , BufferAdapter = require('../adapters/BufferAdapter.js')
  , Graphic = require('../models/Graphic.js')
  , _ = require('lodash');

/**
 * Constructor for game Graphics Data Loader
 * @param game
 * @param storage
 * @param path
 * @constructor
 */
var BinaryGraphicLoader = function BinaryGraphicLoader(game, storage, path) {
  this.game = game;
  this.config = this.game.ao.config.get('loaders');
  this._path = path || this.config.graphic.path;
  this._storage = storage || new this.config.graphic.storage();
  EventManager.eventify(this);
};

/**
 * Performs the load of all graphics binary files
 * @param onLoadCallback
 * @returns {*|Phaserengoader|{}}
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