/**
 * Module dependencies
 * @type {*}
 */
var Controller = require('./Controller.js')
  , properties = require('../properties')
  , Phaser = require('Phaser')
  , Stats = require('Stats')
  , _ = require('lodash');

/**
 *  BootController class - Extends abstract controller
 * @type {*}
 */
var  BootController = function(game) {
  Controller.call(this, [game]);
};

/**
 * Extends  BootController prototype using abstract Controller
 * @type {Controller}
 */
 BootController.prototype = _.create(Controller.prototype, {
  'construtor':  BootController
});

/**
 * Initialize game stats in DOM element
 * @type {Function}
 * @private
 */
var addStats = function() {
  var stats = new Stats();

  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  setInterval(function () {
    stats.begin();
    stats.end();
  }, 1000 / 60);
};

/**
 * Completely boots and configures PhaserJS game instance
 * @returns {*}
 */
BootController.prototype.create = function() {
  if (properties.showStats) {
    addStats();
  }

  this.game.sound.mute = properties.mute;
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.scale.refresh();

  this.game.state.start('preloader');
};

/**
 * Exports this controller module
 * @type {*}
 */
module.exports = BootController;