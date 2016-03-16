/**
 * Defines configuration settings for maps loading and storage
 * @type {*}
 */
module.exports = {

  /**
   * Path in from where maps get loaded
   * @type {string}
   */
  path: 'assets/maps/',

  /**
   * Driver to use for Map Managing
   * @type {}
   */
  driver: require('../managers/MapManager.js'),

  /**
   * Driver used to retrieve and load single map file
   * @type {}
   */
  loader: require('../loaders/BinaryMapLoader.js'),

  /**
   * Model in which the map data is stored
   * @type {}
   */
  model: require('../models/Map.js'),

  /**
   * Driver to use for map storage
   * @type {}
   */
  storage: require('../storage/MemoryMapStorage.js'),

  /**
   * Format for map file names
   * @type {string}
   */
  format: 'Mapa{number}.dat'

}