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
var Body = function(id) {
  this._id = id;
  this.graphics = {};
  this.headOffsetX = 0;
  this.headOffsetY = 0;

  this.loader = new Body.BufferLoader(this);
};

/**
 * Declares the header file size for binary files
 * @const
 * @type {number}
 */
Body.HEADER_SIZE = 263;

/**
 * Body Buffer Loader instance
 * @param body
 * @constructor
 */
Body.BufferLoader = function(body) {
  this.body = body;
}

/**
 * Loads a body object model from a given buffer adapter
 *
 * @param BufferAdapter reader
 * @returns {Body}
 */
Body.BufferLoader.prototype.load = function(reader) {
  this.body.graphics['north'] = reader.getNextInt16();
  this.body.graphics['east'] = reader.getNextInt16();
  this.body.graphics['south'] = reader.getNextInt16();
  this.body.graphics['west'] = reader.getNextInt16();
  this.body.headOffsetX = reader.getNextInt16();
  this.body.headOffsetY = reader.getNextInt16();

  return this.body;
}

/**
 * Exports this module's object
 * @type {Function}
 */
module.exports = Body;