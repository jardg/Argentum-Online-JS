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

  /**
   * Save this texture manager instance into our game's internal
   * texture manager
   * @type {{}|*|Array}
   */
  this.game.ao.managers = this.game.ao.managers || {};
  this.game.ao.managers.texture = this;

};

/**
 * Loads a given texture using a given grh id {texture}
 * @param grh - Key of the texture to load
 * @returns {TextureManager}
 */
TextureManager.prototype.load = function(grh) {
  try {
    if(this.game.ao.storage.texture.has(grh)) {
      console.info('[managers/TextureManager.js]: Returning texture already in storage cache.');
      return this.game.ao.storage.texture.get(grh);
    }

    return this.loader.load(grh);
  } catch(err) {
    console.error('[managers/TextureManager.js]: Texture with key [' + grh + '] failed to load: ' + err.message);
  }
};

/**
 * Export this module constructor
 * @type {Function}
 */
module.exports = TextureManager;