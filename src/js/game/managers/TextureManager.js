/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var config = require('../config/textures.js')
  , _ = require('lodash');

/**
 * TextureManager class - Loads all assets from a configuration file
 * @param game
 * @constructor
 */
var TextureManager = function(game) {

  var config = require('../config/textures.js')

  /**
   * Stores PhaserJS Game Instance
   * @type Phaser
   */
  this.game = game;

  /**
   * Instantiates texture loader into this manager
   * @type {TextureLoader}
   */
  this.loader = new config.loader(game, new config.storage());

};

/**
 * Loads a given map using a given map id {map}
 * @param grh - Key of the texture to load
 * @returns {TextureManager}
 */
TextureManager.prototype.load = function(grh) {
  try {
    var texture = this.loader.load(grh);
  } catch(err) {
    console.error('[managers/TextureManager.js]: Texture with key [' + grh + '] failed to load: ' + err.message);
  }

  return texture;
};

/**
 * Export this module constructor
 * @type {Function}
 */
module.exports = TextureManager;