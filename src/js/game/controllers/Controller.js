/**
 * Node module dependencies
 * @type {EventManager|exports|module.exports}
 */
var EventManager = require('../managers/EventManager.js')
  , Phaser = require('Phaser');

/**
 * Class Controller - Abstracted controller containing required
 * public properties for Phaser to extend to.
 * @constructor
 */
var Controller = function(game) {

  /**
   * Stores Phaser game object instance
   * @type Phaser
   */
  this.game = game;

  /**
   * Eventify this controller
   */
  EventManager.eventify(this);
};

/**
 * Interface for abstracted controller methods.
 * Uses default Phaser.State prototype interface.
 *
 * @interface
 */
Controller.prototype = Phaser.State.prototype;

/**
 * Implicit constructor declaration to avoid overriding of
 * above prototype definition.
 * @type {Function}
 */
Controller.prototype.constructor = Controller;

/**
 * Export our abstracted controller as a node dependency
 * @type {Function}
 */
module.exports = Controller;