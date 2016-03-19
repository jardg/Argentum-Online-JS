/**
 * Argentum Online JS - Game entry point:
 *
 *  This is the initial class of this game, it gets loaded
 *  on index.html and it's the entry point for all the states
 *  that configured in 'config/states.js'
 */
(function() {

  /**
   * Declare needed game dependencies
   * @type {*}
   */
  var Phaser = require('Phaser')
    , properties = require('./properties')
    , StateManager = require('./managers/StateManager.js')
    , LoaderManager = require('./managers/LoaderManager.js')
    , TextureManager = require('./managers/TextureManager.js');

  Phaser.Game.prototype.ao = {
    managers: {}
    , storage: {}
    , loaders: {}
  };

  /**
   * Start our game instance
   * @type {Phaser.Game}
   */
  var game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game');
  game.ao.managers.texture = new TextureManager(game);
  game.ao.managers.loader = new LoaderManager(game);

  /**
   * Instantiate the StateManager and le the magic begin!
   */
  StateManager = new StateManager(game);

})();