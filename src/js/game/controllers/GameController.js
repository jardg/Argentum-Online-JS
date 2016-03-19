/**
* Module dependencies
* @type {*}
*/
var Controller = require('./Controller.js')
    , maps = require('../config/maps.js')
    , _ = require('lodash');

/**
 * GameController class - Extends abstract controller
 * @type {*}
 */
var GameController = function(game) {
  Controller.call(this, [game]);
  var config = maps = require('../config/maps.js');

  /**
   * Instantiates a map manager driver into this controller
   * @type {MapManager}
   */
  this.map = new config.driver(game);
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
  this.map.load(1);
}

/**
 * Just show a PhaserJS logo indicating that everything went smoothly
 * @returns {*}
 */
GameController.prototype.create = function() {
  var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5, 0.5);
};

/**
 * Exports this controller module
 * @type {*}
 */
module.exports = GameController;