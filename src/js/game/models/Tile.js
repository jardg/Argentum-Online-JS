/**
 * Module imports
 * @type {*|exports|module.exports}
 */
var Position = require('./Position.js')
  , _ = require('lodash');

/**
 * Tile class - Model for saving tile data
 * @param id
 * @constructor
 */
var Tile = function Tile() {

  /**
   * Array containing tile graphics data in each layer
   * @type {Array}
   */
  this.graphics = [0, 0, 0, 0];

  /**
   * Stores whether this tile is blocked or not
   * @type {boolean}
   */
  this.blocked = false;

  /**
   * Stores the object grh index for this tile
   * @type {number}
   */
  this.object = 0;

  /**
   * Stores the npc index for this tile
   * @type {number}
   */
  this.npc = 0;

  /**
   * Stores the trigger type for this tile
   * @type {number}
   */
  this.trigger = 0;

  /**
   * Complete position vector of this tile
   * @type {number}
   */
  this.position = new Position(0, 0, 0);

  /**
   * Exit trigger vector for this map
   * @type {number}
   */
  this.exit = new Position(0, 0, 0);

}

/**
 * Loads each one of this tile graphics into memory using a graphic storage
 * @param graphicStorage
 * @returns {Tile}
 */
Tile.prototype.loadGraphics = function(graphicStorage, textureManager) {
  _.each(this.graphics, function(graphic, key) {
    var graphic = graphicStorage.get(graphic);
    var texture = textureManager.load(graphic.number);

    this.graphics[key] = graphic;
  });

  return this;
};

/**
 * Exports this model constructor
 * @type {Function}
 */
module.exports = Tile;