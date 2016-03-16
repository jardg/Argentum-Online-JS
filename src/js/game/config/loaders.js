module.exports = {

  /**
   * Configuration for Graphic loader
   * @type {*}
   */
  graphic: {
      driver: require('../loaders/BinaryGraphicLoader.js')
    , storage: require('../storage/MemoryGraphicStorage.js')
    , path: 'assets/init/graphics.ind'
  },

  /**
   * Configuration for Map loader
   * @type {*}
   */
  map: {
    driver: require('../loaders/BinaryMapLoader.js')
    , storage: require('../storage/MemoryMapStorage.js')
    , autostart: false
  },

  /**
   * Configuration for Body loader
   * @type {*}
   */
  body: {
      driver: require('../loaders/BinaryBodyLoader.js')
    , storage: require('../storage/MemoryBodyStorage.js')
    , path: 'assets/init/bodies.ind'
  },

  /**
   * Configuration for Head loader
   * @type {*}
   */
  head: {
      driver: require('../loaders/BinaryHeadLoader.js')
    , storage: require('../storage/MemoryHeadStorage.js')
    , path: 'assets/init/heads.ind'
  },

  /**
   * Configuration for Helmet loader
   * @type {*}
   */
  helmet: {
      driver: require('../loaders/BinaryHelmetLoader.js')
    , storage: require('../storage/MemoryHelmetStorage.js')
    , path: 'assets/init/helmets.ind'
  },

  /**
   * Configuration for Weapon loader
   * @type {*}
   */
  weapon: {
      driver: require('../loaders/BinaryWeaponLoader.js')
    , storage: require('../storage/MemoryWeaponStorage.js')
    , path: 'assets/init/weapons.dat'
  },

  /**
   * Configuration for Shield loader
   * @type {*}
   */
  shield: {
      driver: require('../loaders/BinaryShieldLoader.js')
    , storage: require('../storage/MemoryShieldStorage.js')
    , path: 'assets/init/shields.dat'
  },

};