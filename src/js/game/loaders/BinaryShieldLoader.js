/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var loaders = require('../config/loaders.js')
  , EventManager = require('../managers/EventManager.js')
  , Shield = require('../models/Shield.js')
  , ini = require('rt-node-ini')
  , _ = require('lodash');

/**
 * Constructor for game Shield Data Loader
 * @param game
 * @param storage
 * @param path
 * @constructor
 */
var BinaryShieldLoader = function BinaryShieldLoader(game, storage, path) {
  this.game = game;
  this._path = path || loaders.shield.path;
  this._storage = storage;
  EventManager.eventify(this);
};

/**
 * Converts an ArrayBuffer object to a Buffer
 * @param ab
 * @returns {Buffer}
 */
var toBuffer = function(ab) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

/**
 * Performs the load of all shields binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryShieldLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('shields', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryShieldLoader.prototype.process = function(key, buffer) {
  var buffer = toBuffer(buffer).toString('utf8')
    , reader = ini.parseRaw(buffer)
    , count = parseInt(reader['INIT']['NumEscudos'])
    , self = this;

  _.range(1, count + 1).forEach(function(value) {
    var shield = new Shield(value);
    shield.loader.load(reader);
    self.fire('onProcessed', [shield], self);
  });

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed shields
 * @param shield
 */
BinaryShieldLoader.prototype.onProcessed = function(shield) {
  this._storage.add(shield.grh, shield);
};

/**
 * Exports object constructor
 * type {Function}
 */
module.exports = BinaryShieldLoader;