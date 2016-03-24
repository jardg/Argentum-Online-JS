/**
 * Defines this module's import statements
 * @type {*|exports|module.exports}
 */
var Graphic = require('../models/Graphic')
  , _ = require('lodash');

/**
 * MapRenderer class - Takes care of rendering a map (actually just
 * loads a map sprites into memory)
 * @param game
 * @constructor
 */
var MapRenderer = function MapRenderer(game) {

  /**
   * Stores game instance reference
   * @type {Phaser.Game}
   */
  this.game = game;

  /**
   * Sprites group for the current loaded map
   * @type {*|Phaser.Group}
   */
  this.layers = [];

};

/**
 * Defines this map's hardcoded first layer index
 * @type {number}
 */
MapRenderer.prototype.FIRST_LAYER = 0;

/**
 * Defines this map's hardcoded second layer index
 * @type {number}
 */
MapRenderer.prototype.SECOND_LAYER = 1;

/**
 * Defines this map's hardcoded third layer index
 * @type {number}
 */
MapRenderer.prototype.THIRD_LAYER = 2;

/**
 * Defines this map's hardcoded fourth layer index
 * @type {number}
 */
MapRenderer.prototype.FOURTH_LAYER = 4;

/**
 * Initializes the renderer and creates this map's sprites
 * @param {Map} map
 * @returns {MapRenderer}
 */
MapRenderer.prototype.start = function(map) {
  var self = this;

  this.reset();
  this.layers.forEach(function(layer, key) {
    self.renderLayer(map, key, layer);
  });

  return this;
};

/**
 * Loads all map tiles into this layer's group as sprites
 * @param {Map} map
 * @param {number} layer
 * @param {Phaser.Group} group
 */
MapRenderer.prototype.renderLayer = function(map, layer, group) {
  for(var x = 0; x < map.MAP_TILE_WIDTH; x++) {
    for(var y = 0; y < map.MAP_TILE_HEIGHT; y++) {
      var tile = map.tiles[map.getTilePosition(x, y)];
      var graphic = tile.graphics[layer];
      if( ! graphic) continue;

      var sprite = this.game.add.sprite(
        x * graphic.TILE_WIDTH,
        y * graphic.TILE_HEIGHT,
        graphic.texture
      );

      group.add(sprite);
    }
  }
};

/**
 * Resets this map layers by re-adding the layer groups
 * (maybe this can be enhancedby reusing the previous layer
 * sprite objects, not worrying about that right now)
 * @returns {*}
 */
MapRenderer.prototype.reset = function() {
  this.layers = [];
  this.addLayers(4);
};

/**
 * Adds N amount of groups depending on the parameter
 * amount, creates sprite groups
 * @param amount
 * @returns {MapRenderer}
 */
MapRenderer.prototype.addLayers = function(amount) {
  var self = this;

  _.range(0, amount).forEach(function(index) {
    var group = self.game.add.group();
    self.layers.push(group);
  });

  return this;
};

/**
 * Exports this module constructor
 * @type {Function}
 */
module.exports = MapRenderer;