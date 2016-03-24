var ArgentumClient = require('./ArgentumClient')
  , Phaser = require('Phaser');

/**
 * ClientBootstrap class - Handles the initial entry point of
 * this project, initializes core dependencies
 * @param {ArgentumClient} ao
 * @constructor
 */
var ClientBootstrap = function(ao) {

  /**
   * Save parent AOJS instance
   * @type {Argentum}
   */
  this.ao = ao;

  /**
   * Initialize bootstraping
   * @type {Boolean}
   */
  this.init();

};

/**
 * Initialize our game object
 * @returns {Argentum}
 */
ClientBootstrap.prototype.init = function() {

  /**
   * Define game instance object internally
   * @type {Phaser.Game}
   */
  this.ao.game = new Phaser.Game(
    this.ao.properties.size.x,
    this.ao.properties.size.y,
    Phaser.AUTO, 'game'
  );

  /**
   * Circular dependency to access ArgentumClient from Game
   * @type {ArgentumClient}
   */
  this.ao.game.ao = this.ao;

};

/**
 * Initializes configs and managers, game entry point
 * will probably in StateManager (once it loads states,
 * it will load the first predefined state that has an
 * autostart property in it, for more info check config
 * files).
 *
 * @returns {*}
 */
ClientBootstrap.prototype.start = function() {

  // Initialize game factories and init our first state
  this.ao.config = this.ao.config.load();
  this.ao.managers = this.ao.manager.load();

}

/**
 * Export module constructor and set Argentum instance to it
 * @type {Function}
 */
ArgentumClient.ClientBootstrap = ClientBootstrap;
module.exports = ClientBootstrap;