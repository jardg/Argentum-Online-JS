/**
 * Module dependencies
 * @type {configuration|exports|module.exports}
 */
var config = require('../config/textures.js')
  , EventManager = require('../managers/EventManager.js')
  , _ = require('lodash');

/**
 * Constructor for game Textures Loader
 * @param game
 * @param storage
 * @param path
 * @constructor
 */
var TextureLoader = function TextureLoader(game, storage, path) {
  var config = require('../config/textures.js');

  this.game = game;
  this._storage = storage || new config.storage();
  this._path = path || config.path;
  this.config = config;
  EventManager.eventify(this);
};

/**
 * Generates a texture filename using value of format in
 * textures configuration file and appending the result
 * to the previously loaded path string
 * @param mapId
 * @returns {string}
 */
TextureLoader.prototype.getImagePath = function(image) {
  return this._path + this.config.format.replace(/\{number}/, image.toString());
};

/**
 * Performs the load of all textures binary files
 * @param key
 * @returns {*|Phaser.Loader|{}}
 */
TextureLoader.prototype.load = function(key) {
  var grh = this.game.ao.managers.loader.get('graphic')._storage.get(key);

  return grh.textureLoader.load(key, this.getImagePath(key), this._storage);
};

/**
 * Exports object constructor
 * @type {Function}
 */
module.exports = TextureLoader;