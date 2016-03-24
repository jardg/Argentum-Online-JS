var Phaser = require('Phaser')
  , Bootstrap = require('./Bootstrap')
  , Factory = require('./Factory')
  , _ = require('lodash');

/**
 * Define base Argentum interface
 * @type {Object}
 */
//var Argentum = function() {
//
//  return {
//
//    /**
//     * Game engine that Argentum is going to use
//     * @type {Phaser.Game|*}
//     */
//    game: {}
//
//    /**
//     * Holds all game managers (dynamically loaded on runtime)
//     * @type {{}}
//     */
//    , managers: {}
//
//    /**
//     * Holds all game Storages (dynamically loaded on runtime)
//     * @type {{}}
//     */
//    , storage: {}
//
//    /**
//     * Defines GameObjectFactory method for Argentum
//     * @type {Function}
//     */
//    , GameObjectFactory: function () {
//    }
//
//    /**
//     * Defines ManagerFactory method for Argentum
//     * @type {Function}
//     */
//    , ManagerFactory: function () {
//    }
//
//    /**
//     * Defines ConfigFactory method for Argentum
//     * @type {Function}
//     */
//    , ConfigFactory: function () {
//    }
//
//    /**
//     * Defines getConfigPath method for Argentum
//     * @type {Function}
//     */
//    , getConfigPath: function () {
//    }
//
//    /**
//     * Defines getManagersPath method for Argentum
//     * @type {Function}
//     */
//    , getManagersPath: function () {
//    }
//  }
//
//};

/**
 * Argentum class - Constructor for core AOJS Object
 * @param properties
 * @extends Argentum
 * @constructor
 */
var Argentum = function Argentum(properties) {

  /**
   * Save properties object in game object
   * @type {{}}
   */
  this.properties = properties;

  /**
   * Create a new Factory instance
   * @type {Argentum.Factory}
   */
  this.factory = new Factory(this);

  /**
   * Initialize our internal GameObjectFactory
   * @type {Argentum.GameObjectFactory}
   */
  this.add = new Argentum.GameObjectFactory(this);

  /**
   * Add bootstrap instance into internal game object
   * and start our game automatically
   * @type {Argentum.Bootstrap}
   */
  this.bootstrap = new Argentum.Bootstrap(this, true);

};

/**
 * Argentum prototype methods
 * @type {{}}
 */
Argentum.prototype = {

  /**
   * Obtains configurations path for this game instance
   * @returns {string}
   */
  getConfigPath: function() {
    return __dirname + '/../config/';
  }

  /**
   * Obtains managers path for this game instance
   * @returns {string}
   */
  , getManagersPath: function() {
    return __dirname + '/../managers/'
  }

};

/**
 * Save ao Argentum interface into Phaser Game
 * @type {Object}
 */
Phaser.Game.prototype.ao = Argentum;

/**
 * Export this class constructor
 * @type {Function}
 */
module.exports = Argentum;