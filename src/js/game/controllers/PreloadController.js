/**
 * Module dependencies
 * @type {*}
 */
var LoadManager = require('../managers/LoadManager.js')
  , Controller = require('./Controller.js')
  , _ = require('lodash');

/**
 * PreloadController class - Extends abstract controller
 * @type {*}
 */
var PreloadController = function(game) {
  Controller.call(this, [game]);
};

/**
 * Extends PreloadController prototype using abstract Controller
 * @type {Controller}
 */
PreloadController.prototype = _.create(Controller.prototype, {
  'construtor': PreloadController
});

/**
 * PreloadController prototype
 * @returns {*}
 */
PreloadController.prototype.preload = function() {
  var loader = new LoadManager(this.game);

  this.game.load.image('logo', 'images/phaser.png#grunt-cache-bust');

  return loader.start();
};

/**
 * Start game state after preload is complete
 * @returns {*}
 */
PreloadController.prototype.create = function() {
  this.game.state.start('game');
};

/**
 * Exports this controller module
 * @type {*}
 */
module.exports = PreloadController;