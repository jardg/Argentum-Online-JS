var ArgentumClient = require('../ArgentumClient');

/**
 * GameObjectFactory class - Instantiates all AO game objects
 * @param ao
 * @constructor
 */
var GameObjectFactory = function GameObjectFactory(ao) {

  /**
   * Reference to AOJS Engine
   * @type {ArgentumClient}
   */
  this.ao = ao;

  /**
   * Holds all game data loaders (dynamically loaded on runtime)
   * @type {{}}
   */
  this.ao.loaders = {};

}

/**
 * Defines prototype of loadable objects
 * @type {{manager: Function, loader: Function, storage: Function}}
 */
GameObjectFactory.prototype = {

  /**
   * Adds a manager into internal manager structure
   * @param key
   * @param driver
   * @param args
   * @returns {*|Manager}
   */
  manager: function (key, driver, args) {
    return this.ao.managers[key] = new driver(this.ao.game, args);
  }

  /**
   * Adds a loader into internal loaders structure
   * @param key
   * @param driver
   * @param storage
   * @param path
   * @returns {*|Manager}
   */
  , loader: function (key, driver, storage, path) {
    return this.ao.loaders[key] = new driver(this.ao.game, storage, path);
  }

  /**
   * Adds a storage into internal storages structure
   * @param key
   * @param driver
   * @param args
   * @returns {*|Storage}
   */
  , storage: function (key, driver, args) {
    return this.ao.storage[key] = new driver(this.ao.game, args);
  }

}

/**
 * Exports this module constructor
 * @type {Function}
 */
module.exports = GameObjectFactory;