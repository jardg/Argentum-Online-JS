/**
 * Defines configuration settings for textures loading and storage
 * @type {*}
 */
module.exports = {

  /**
   * Path in from where textures get loaded
   * @type {string}
   */
  path: 'images/',

  /**
   * Driver to use for Texture Managing
   * @type {TextureManager}
   */
  driver: require('../managers/TextureManager.js'),

  /**
   * Driver used to retrieve and load single texture files
   * @type {*}
   */
  loader: require('../loaders/TextureLoader.js'),

  /**
   * Driver used to store images in memory
   * @type {*}
   */
  storage: require('../storage/MemoryTextureStorage.js'),

  /**
   * Format for texture file names
   * @type {string}
   */
  format: '{number}.png'

}