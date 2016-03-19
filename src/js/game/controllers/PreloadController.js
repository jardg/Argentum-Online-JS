/**
 * Module dependencies
 * @type {*}
 */
var Controller = require('./Controller.js')
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
  this.game.load.image('logo', 'images/phaser.png#grunt-cache-bust');

  return this.game.ao.managers.loader.start();
};

/**
 * Start game state after preload is complete
 * @returns {*}
 */
PreloadController.prototype.create = function() {
  var self = this;

  _.each(this.game.ao.storage, function(storage, key) {
    if(key === 'graphic' || key === 'texture' || key === 'map') return;

    _.each(storage.all(), function(model, key) {
      model.loadGraphics(self.game);
      console.log(model);
    });
  });

  this.game.state.start('game');
};

/**
 * Exports this controller module
 * @type {*}
 */
module.exports = PreloadController;