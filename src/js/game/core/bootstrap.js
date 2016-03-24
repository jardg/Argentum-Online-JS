var Argentum = require('./Argentum');

/**
 * Bootstrap class - Handles the initial code of this project,
 * defines dependencies for core
 * @param ao
 * @constructor
 */
var Bootstrap = function(ao, start) {

  /**
   * Save parent AOJS instance
   * @type {Argentum}
   */
  this.ao = ao;

  /**
   * Start our game if start is set to true
   * @type {Boolean}
   */
  if(start) this.start();

};

/**
 * Initialize our game object
 * @returns {Argentum}
 */
Bootstrap.prototype.start = function() {

  /**
   * Define game isntance object internally
   * @type {Phaser.Game}
   */
  this.ao.game = new Phaser.Game(
    this.ao.properties.size.x,
    this.ao.properties.size.y,
    Phaser.AUTO, 'game'
  );

  // Initialize game factories and init our first state
  this.ao.config = this.ao.config.load();
  this.ao.managers = this.ao.manager.load();

};

/**
 * Export module constructor and set Argentum instance to it
 * @type {Function}
 */
Argentum.Bootstrap = Bootstrap;
module.exports = Bootstrap;