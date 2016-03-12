/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var files = require('../../config/files.js')
  , EventManager = require('../../events/EventManager.js')
  , BufferAdapter = require('../../adapters/BufferAdapter.js')
  , Head = require('../../models/Head.js')
  , _ = require('lodash');

/**
 * Constructor for game Head Data Loader
 * @param game
 * @param storage
 * @constructor
 */
var BinaryHeadLoader = function BinaryHeadLoader(game, storage) {
  this.game = game;
  this._path = files.heads;
  this._storage = storage;
  EventManager.eventify(this);
};

/**
 * Performs the load of all heads binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryHeadLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('heads', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryHeadLoader.prototype.process = function(key, buffer) {
  var reader = new BufferAdapter(buffer, true);
  var header = reader.skipBytes(Head.HEADER_SIZE);
  var count = reader.getNextInt16();

  for(var i in _.range(1, count)) {
    var head = new Head(i);
    head.loader.load(reader);
    this.fire('onProcessed', [head], this);
  }

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed heads
 * @param head
 */
BinaryHeadLoader.prototype.onProcessed = function(head) {
  this._storage.add(head.grh, head);
};

/**
 * Exports object constructor
 * type {Function}
 */
module.exports = BinaryHeadLoader;