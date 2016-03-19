var Phaser = require('Phaser')
  , StateManager = require('./managers/StateManager')
  , LoaderManager = require('./managers/LoaderManager')
  , MapManager = require('./managers/MapManager')
  , TextureManager = require('./managers/TextureManager')
  , TextureStorage = require('./storage/MemoryTextureStorage');

// Inflate Phaser.Game prototype and add self-referencing ao object
Phaser.Game.prototype.ao = {};

/**
 * AOJS class - Constructor for complete game client object
 * @param properties
 * @constructor
 */
var AOJS = function AOJS(properties) {

  /**
   * Save properties object in game object
   * @type {{}}
   */
  this.properties = properties;

  /**
   * Define game isntance object internally
   * @type {*|Phaser.Game}
   */
  this.game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game');

  /**
   * Holds all game managers (dynamically loaded on runtime)
   * @type {{}}
   */
  this.managers = {};

  /**
   * Holds all game Storages (dynamically loaded on runtime)
   * @type {{}}
   */
  this.storage = {};

  /**
   * Holds all game data loaders (dynamically loaded on runtime)
   * @type {{}}
   */
  this.loaders = {};

  // Inflate this object in Phaser game object
  this.game.ao = this;

  // Initialize everything
  this.init();

};

/**
 * AOJS prototype methods
 * @type {{init: Function, addManager: Function, addStorage: Function}}
 */
AOJS.prototype = {

  /**
   * Initialize game using PhaserJS
   * @returns {Phaser.Game}
   */
  init: function() {
    // Add required Managers and Storages into memory
    this.addManager('texture', TextureManager);
    this.addManager('loader', LoaderManager);
    this.addManager('state', StateManager);
    this.addManager('map', MapManager);

    // Initiate game StateManager
    return this.managers.state.init();
  }

  /**
   * Adds a manager into internal manager structure
   * @param key
   * @param driver
   * @param args
   * @returns {*|Manager}
   */
  , addManager: function(key, driver, args) {
    return this.managers[key] = new driver(this.game, args);
  }

  /**
   * Adds a loader into internal loaders structure
   * @param key
   * @param driver
   * @param storage
   * @param path
   * @returns {*|Manager}
   */
  , addLoader: function(key, driver, storage, path) {
    return this.loaders[key] = new driver(this.game, storage, path);
  }

  /**
   * Adds a storage into internal storages structure
   * @param key
   * @param driver
   * @param args
   * @returns {*|Storage}
   */
  , addStorage: function(key, driver, args) {
    return this.storage[key] = new driver(this.game, args);
  }

};

/**
 * Export this class constructor
 * @type {Function}
 */
module.exports = AOJS;