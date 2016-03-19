/**
 * Argentum Online JS - Game entry point:
 *
 *  This is the initial class of this game, it gets loaded
 *  on index.html and it's the entry point for all the states
 *  that are configured in 'config/states.js'
 */
(function() {

  /**
   * Declare needed game dependencies
   * @type {*}
   */
  var AOJS = require('./AOJS')
    , properties = require('./properties');

  /**
   * Start our game instance
   * @type {Phaser.Game}
   */
  var ao = new AOJS(properties);

})();