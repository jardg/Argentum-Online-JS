/**
 * Constructor for BufferAdapter Class
 *
 * @param buffer
 * @param endiannes False for big endian (default), true for little endian
 * @constructor
 */
var BufferAdapter = function(buffer, endiannes) {
  this.dataView = new DataView(buffer);
  this.endiannes = endiannes || false;
  this.position = 0;
};

/**
 * Length in bytes of int16 data type
 * @type {number}
 */
BufferAdapter.INT16_LENGTH = 2;

/**
 * Length in bytes of float32 data type
 * @type {number}
 */
BufferAdapter.FLOAT32_LENGTH = 4;

/**
 * Length in bytes of int32 data type
 * @type {number}
 */
BufferAdapter.INT32_LENGTH = 4;

/**
 * Checks if an offset and length are out of bounds in the DataView
 * @param offset
 * @param length
 * @returns {boolean}
 */
BufferAdapter.prototype.isOutOfBounds = function(offset, length) {
  return (offset + length > this.dataView.byteLength);
}

/**
 * Obtains and returns the next int16 from the dataView buffer
 * @param {Number} [offset=undefined]
 * @returns {Number,boolean}
 */
BufferAdapter.prototype.getNextInt16 = function(offset) {
  var offset = offset || this.position;
  if(this.isOutOfBounds(offset, BufferAdapter.INT16_LENGTH)) return false;

  var data = this.dataView.getInt16(offset, this.endiannes);
  this.position += BufferAdapter.INT16_LENGTH;

  return data;
};

/**
 * Obtains and returns the next int16 from the dataView buffer
 * @param {Number} [offset=undefined]
 * @returns {Number,boolean}
 */
BufferAdapter.prototype.getNextInt32 = function(offset) {
  var offset = offset || this.position;
  if(this.isOutOfBounds(offset, BufferAdapter.INT32_LENGTH)) return false;

  var data = this.dataView.getInt32(offset, this.endiannes);
  this.position += BufferAdapter.INT32_LENGTH;

  return data;
};

/**
 * Obtains and returns the next int16 from the dataView buffer
 * @param {Number} [offset=undefined]
 * @returns {Number,boolean}
 */
BufferAdapter.prototype.getNextFloat32 = function(offset) {
  var offset = offset || this.position;
  if(this.isOutOfBounds(offset, BufferAdapter.FLOAT32_LENGTH)) return false;

  var data = this.dataView.getFloat32(offset, this.endiannes);
  this.position += BufferAdapter.FLOAT32_LENGTH;

  return data;
};

/**
 * Skips a given amount n of bytes in the buffer
 * @param length
 * @returns {Number,boolean}
 */
BufferAdapter.prototype.skipBytes = function(length) {
  var offset = offset || this.position;
  if(this.isOutOfBounds(offset, BufferAdapter.INT16_LENGTH)) return false;

  return this.position += length;
};

/**
 * Exports the current module
 *
 * @type {Function}
 */
module.exports = BufferAdapter;