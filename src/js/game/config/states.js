/**
 * Defines all of the available game states
 * and it's usable controllers and templates
 */
module.exports = {

  /**
   * Boot State definition
   * @type {*}
   */
  boot: {
      controller: require('../controllers/BootController.js')
    , autostart: true
  },

  /**
   * Preloader State definition
   * @type {*}
   */
  preloader: {
      controller: require('../controllers/PreloadController.js')
  },

  /**
   * Game State definition
   * @type {*}
   */
  game: {
    controller: require('../controllers/GameController.js')
  },

};