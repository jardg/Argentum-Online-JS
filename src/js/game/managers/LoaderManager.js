/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var loaders = require('../config/loaders.js')
  , _ = require('lodash');

/**
 * LoadManager class - Loads all assets from a configuration file
 * @param game
 * @constructor
 */
var LoadManager = function(game) {

  /**
   * Stores PhaserJS Game Instance
   * @type Phaser
   */
  this.game = game;

  /**
   * Loaders found in the loaders.js configuration file
   * @type {*|exports|module.exports}
   * @private
   */
  this._loaders = loaders;

};

/**
 * Initialize all loaders found in our internal loaders object.
 * This loaders are generally loaded from the 'loaders' config
 * file in your client installation path.
 *
 * @returns {LoadManager}
 */
LoadManager.prototype.start = function() {
  var self = this;

  _.each(this._loaders, function(loader, key) {
    self.load(loader, key);
  });

  return this;
};

/**
 * Loads a given loader object (needs to use the defined
 *  structure in loaders.js configuration file).
 * @param loader
 * @param key
 * @returns {LoadManager}
 */
LoadManager.prototype.load = function(loader, key) {
  var storage = new loader.storage()
    , loader = new loader.driver(this.game, storage, loader.path);

  try {
    loader.load(null, function(storage) {
      console.info('[managers/LoadManager.js]: Successfully loaded ' + storage.count() +
                   ' objects from loader with key [' + key + ']');
    });
  } catch(err) {
    console.error('[managers/LoadManager.js]: Loader with key [' +
                  key + '] failed to load: ' + err.message);
  }

  return this;
};

/**
 * Export this module definition
 * @type {Function}
 */
module.exports = LoadManager;