/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var _ = require('lodash');

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
  this.loaders = this.game.ao.config.get('loaders');

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

  _.each(this.loaders, function(loader, key) {
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
  var storage = this.game.ao.add.storage(key, loader.storage)
    , loader = this.game.ao.add.loader(key, loader.driver, storage, loader.path);

  try {
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
 * Export this module definition
 * @type {Function}
 */
module.exports = LoaderManager;