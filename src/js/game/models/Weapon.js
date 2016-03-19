/**
 * Node modules dependencies
 * @type {exports|module.exports}
 * @private
 */
var _ = require('lodash');

/**
 * Object constructor
 * @param id
 * @constructor
 */
var Weapon = function(id) {

  /**
   * Unique identifier of this model
   * @type {number}
   */
  this._id = id;

  /**
   * Graphic index for each of the graphics stored in this model
   * @type {{north: number, west: number, south: number, east: number}}
   */
  this.graphics =
  {   north: 0
    , east: 0
    , south: 0
    , west: 0
  };

  /**
   * Internal abstracted weapon graphic loader
   *      (using hardcoded buffer loader for binary loaders)
   * @type {Weapon.BufferLoader}
   */
  this.loader = new Weapon.BufferLoader(this);
};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Weapon.HEADER_SIZE = 263;

/**
 * Fills all of the graphics in this model with the graphic
 * model stored in game's graphic storage
 * @param game
 * @returns {Weapon}
 */
Weapon.prototype.loadGraphics = function(game) {
  var self = this;

  _.each(this.graphics, function(graphic, key) {
    self.graphics[key] = game.ao.storage.graphic.get(graphic);
    game.ao.managers.texture.load(self.graphics[key].grh);
  });

  return this;
};

/**
 * Weapon Buffer Loader instance
 * @param weapon
 * @constructor
 */
Weapon.BufferLoader = function(weapon) {
  this.weapon = weapon;
}

/**
 * Loads a weapon object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Weapon}
 */
Weapon.BufferLoader.prototype.load = function(reader) {
  var weaponKey = 'Arma' + this.weapon._id;
  if(!reader.hasOwnProperty(weaponKey)) return this.weapon;

  this.weapon.graphics['north'] = parseInt(reader[weaponKey]['Dir1']);
  this.weapon.graphics['east'] = parseInt(reader[weaponKey]['Dir2']);
  this.weapon.graphics['south'] = parseInt(reader[weaponKey]['Dir3']);
  this.weapon.graphics['west'] = parseInt(reader[weaponKey]['Dir4']);

  return this.weapon;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Weapon;