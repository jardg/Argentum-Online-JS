/**
 * Node module dependencies
 * @type {*|exports|module.exports}
 */
var states = require('../config/states.js')
  , _ = require('lodash');

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
   * Starts all game states by default
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

    _.each(states, function(state, key) {
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
    if(states.hasOwnProperty(state) &&
       self.game.state.states.hasOwnProperty(state)) {
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