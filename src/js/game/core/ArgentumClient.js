var ClientFactory = require('./ClientFactory')
  , ClientBootstrap = require('./ClientBootstrap')
  , Phaser = require('Phaser')
  , _ = require('lodash');

/**
 * ArgentumClient class - Constructor for core AOJS Object
 * @param properties
 * @constructor
 */
var ArgentumClient = function ArgentumClient(properties) {

  /**
   * Save properties object in game object
   * @type {{}}
   */
  this.properties = properties;

  /**
   * Add bootstrap instance into internal game object
   * and initialize engine's game object (init)
   * @type {ArgentumClient.Bootstrap}
   */
  this.bootstrap = new ClientBootstrap(this, true);

  /**
   * Create a new ClientFactory instance
   * @type {ArgentumClient.ClientFactory}
   */
  this.factory = new ClientFactory(this);

  /**
   * Continue with bootstraping procedure (start)
   */
  this.bootstrap.start();

};

/**
 * ArgentumClient prototype methods
 * @type {{}}
 */
ArgentumClient.prototype = {

  /**
   * Obtains configurations path for this game instance
   * @returns {string}
   */
  getConfigPath: function() {
    return '../../config/';
  }

  /**
   * Obtains managers path for this game instance
   * @returns {string}
   */
  , getManagersPath: function() {
    return '../../managers/'
  }

};

/**
 * Interface definition for ArgentumClient bootstrapper
 * @constructor
 */
ArgentumClient.ClientBootstrap = function() {};

/**
 * Interface definition for ArgentumClient factory
 * @constructor
 */
ArgentumClient.ClientFactory = function() {};

/**
 * Save ao ArgentumClient interface into Phaser Game
 * @type {Object}
 */
Phaser.Game.prototype.ao = ArgentumClient;

/**
 * Export this class constructor
 * @type {Function}
 */
module.exports = ArgentumClient;