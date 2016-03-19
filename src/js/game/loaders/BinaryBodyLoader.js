/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var loaders = require('../config/loaders.js')
  , EventManager = require('../managers/EventManager.js')
  , BufferAdapter = require('../adapters/BufferAdapter.js')
  , Body = require('../models/Body.js')
  , _ = require('lodash');

/**
 * Constructor for game Body Data Loader
 * @param game
 * @param storage
 * @param path
 * @constructor
 */
var BinaryBodyLoader = function BinaryBodyLoader(game, storage, path) {
  this.game = game;
  this._path = path || loaders.body.path;
  this._storage = storage;
  EventManager.eventify(this);
};

/**
 * Performs the load of all body binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryBodyLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('bodies', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryBodyLoader.prototype.process = function(key, buffer) {
  var reader = new BufferAdapter(buffer, true);
  var header = reader.skipBytes(Body.HEADER_SIZE);
  var count = reader.getNextInt16();

  for(var i in _.range(1, count)) {
    var body = new Body(i);
    body.loader.load(reader);
    this.fire('onProcessed', [body], this);
  }

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed body
 * @param body
 */
BinaryBodyLoader.prototype.onProcessed = function(body) {
  var graphicStorage = this.game.ao.storage.graphic
    , textureManager = this.game.ao.managers.texture;

  this._storage.add(body._id, body);
};

/**
 * Exports object constructor
 * @type {Function}
 */
module.exports = BinaryBodyLoader;