/**
 * Position class - Model for storing position data vectors
 * @param map
 * @param x
 * @param y
 * @constructor
 */
var Position = function Position(map, x, y) {
  this.map = map;
  this.x = x;
  this.y = y;
}

/**
 * Exports this model constructor
 * @type {Function}
 */
module.exports = Position;