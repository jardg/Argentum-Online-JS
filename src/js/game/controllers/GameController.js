/**
* Module dependencies
* @type {*}
*/
var Controller = require('./Controller.js')
  , MapRenderer = require('../renderers/MapRenderer')
  , _ = require('lodash');

/**
 * GameController class - Extends abstract controller
 * @type {*}
 */
var GameController = function(game) {
  Controller.call(this, [game]);
  var maps = require('../config/maps.js');

  /**
   * Instantiates a map manager driver into this controller
   * @type {MapManager}
   */
  this.map = new maps.driver(game);

  /**
   * Saves MapRenderer instance
   * @type {MapRenderer}
   */
  this.mapRenderer = new MapRenderer(game);

  /**
   * Saves the current map into this controller
   * @type {*|Map}
   */
  this.currentMap = {};

};

/**
 * Extends GameController prototype using abstract Controller
 * @type {Controller}
 */
GameController.prototype = _.create(Controller.prototype, {
  'construtor': GameController
});

/**
 * Preloads this Game Controller, for test purposes just loads a map
 * @returns {*}
 */
GameController.prototype.preload = function() {
  var self = this;

  this.map.load(1, function(map) {
    self.currentMap = map;
  });
}

/**
 * Just show a PhaserJS logo indicating that everything went smoothly
 * @returns {*}
 */
GameController.prototype.create = function() {
  var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5, 0.5);

  this.mapRenderer.start(this.currentMap);
};

/**
 * Exports this controller module
 * @type {*}
 */
module.exports = GameController;