/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var _ = require('lodash');

/**
 * StateManager class - Manages all states and it's dependencies
 * @param game
 * @constructor
 */
var StateManager = function(game) {

  /**
   * PhaserJS Game instance
   * @type Phaser
   */
  this.game = game;

  /**
   * Saves the configuration file structure into this object
   * @type {states}
   */
  this.config = this.game.ao.config.get('states');

  /**
   * Automatically start this manager.
   * This is the complete game entry point. Enjoy it.
   */
  this.init();

};

/**
 * Prototype for StateManager class
 * @type {{init: Function, start: Function}}
 */
StateManager.prototype = {

  /**
   * Automatically loads all game states
   * into our PhaserJS game instance
   * @returns {StateManager}
   */
  init: function() {
    var self = this;

    _.each(this.config, function(state, key) {
      self.game.state.add(key, state.controller, state.autostart || false);
    });

    return this;
  }

  /**
   * Starts a game state
   * @param state
   * @returns {StateManager}
   */
  , start: function(state) {
    if(self.game.state.states.hasOwnProperty(state)) {
      self.game.state.start(state);
    }

    return this;
  }

};

/**
 * Exports current module
 * @type {Function}
 */
module.exports = StateManager;