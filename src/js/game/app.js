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
  var ArgentumClient = require('./core/ArgentumClient')
    , properties = require('./properties');

  /**
   * Start our game instance
   * @type {ArgentumClient}
   */
  var ao = new ArgentumClient(properties);

})();