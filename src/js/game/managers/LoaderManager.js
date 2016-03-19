/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var loaders = require('../config/loaders.js')
  , _ = require('lodash');

/**
 * LoaderManager class - Loads all assets from a configuration file
 * @param game
 * @constructor
 */
var LoaderManager = function(game) {

  /**
   * Stores PhaserJS Game Instance
   * @type Phaser
   */
  this.game = game;

  /**
   * Loaders found in the loaders.js configuration file
   * @type {*}
   * @private
   */
  this._loaders = loaders;

};

/**
 * Initialize all loaders found in our internal loaders object.
 * This loaders are generally loaded from the 'loaders' config
 * file in your client installation path.
 *
 * @returns {LoaderManager}
 */
LoaderManager.prototype.start = function() {
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
 * @returns {LoaderManager}
 */
LoaderManager.prototype.load = function(loader, key) {
  var storage = this.game.ao.addStorage(key, loader.storage)
    , loader = this.game.ao.addLoader(key, loader.driver, storage, loader.path);

  try {
    this._loaders[key] = loader;
    loader.load(null, function(storage) {
      console.info('[managers/LoaderManager.js]: Successfully loaded ' + storage.count() +
                   ' objects from loader with key [' + key + ']');
    });
  } catch(err) {
    console.error('[managers/LoaderManager.js]: Loader with key [' +
                  key + '] failed to load: ' + err.message);
  }

  return this;
};

/**
 * Obtains a loader driver from internal structure
 * @param key
 * @returns {*}
 */
LoaderManager.prototype.get = function(key) {
  return this._loaders[key];
}

/**
 * Export this module definition
 * @type {Function}
 */
module.exports = LoaderManager;