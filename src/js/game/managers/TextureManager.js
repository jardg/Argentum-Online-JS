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
   * Instantiates this manager storage and sets the hardcoded
   * key inside ao object public storage structure
   * @type {*}
   */
  this.storage = this.game.ao.addStorage('texture', config.storage);

  /**
   * Instantiates texture loader into this manager
   * @type {TextureLoader}
   */
  this.loader = this.game.ao.addLoader('texture', config.loader, this.storage);

};

/**
 * Loads a given texture using a given grh id {texture}
 * @param graphic - Graphic to load it's texture
 * @returns {TextureManager}
 */
TextureManager.prototype.load = function(graphic) {
  try {
    if(this.storage.has(graphic.grh)) {
      console.info('[managers/TextureManager.js]: Returning texture already in storage cache.');
      return this.storage.get(graphic.grh);
    }

    var self = this;
    this.loader.load(graphic, function(graphic, texture) {
      self.storage.add(graphic.grh, texture);
    });
  } catch(err) {
    console.error('[managers/TextureManager.js]: Texture with key [' + graphic.grh + '] failed to load: ' + err.message);
  }
};

/**
 * Export this module constructor
 * @type {Function}
 */
module.exports = TextureManager;