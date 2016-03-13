/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var files = require('../../config/files.js')
  , EventManager = require('../../events/EventManager.js')
  , Weapon = require('../../models/Weapon.js')
  , ini = require('rt-node-ini')
  , _ = require('lodash');

/**
 * Constructor for game Weapon Data Loader
 * @param game
 * @param storage
 * @constructor
 */
var BinaryWeaponLoader = function BinaryWeaponLoader(game, storage) {
  this.game = game;
  this._path = files.weapons;
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
 * Performs the load of all weapons binary files
 * @param onLoadCallback
 * @returns {*|Phaser.Loader|{}}
 */
BinaryWeaponLoader.prototype.load = function(onProcessed, onLoaded) {
  this.addListener('onProcessed', this.onProcessed);
  this.addListener('onProcessed', onProcessed);
  this.addListener('onLoaded', onLoaded);

  return this.game.load.binary('weapons', this._path, this.process, this);
};

/**
 * Processes the loaded data object
 * @param key
 * @param data
 * @returns {*}
 */
BinaryWeaponLoader.prototype.process = function(key, buffer) {
  var buffer = toBuffer(buffer).toString('utf8')
    , reader = ini.parseRaw(buffer)
    , count = parseInt(reader['INIT']['NumArmas'])
    , self = this;

  _.range(1, count + 1).forEach(function(value) {
    var weapon = new Weapon(value);
    weapon.loader.load(reader);
    self.fire('onProcessed', [weapon], self);
  });

  this.fire('onLoaded', [this._storage], this);
  return buffer;
};

/**
 * Callback for processed weapons
 * @param weapon
 */
BinaryWeaponLoader.prototype.onProcessed = function(weapon) {
  this._storage.add(weapon.grh, weapon);
};

/**
 * Exports object constructor
 * type {Function}
 */
module.exports = BinaryWeaponLoader;