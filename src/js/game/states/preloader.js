var GraphicLoader = require('../loaders/graphic/BinaryGraphicLoader.js')
  , GraphicStorage = require('../storage/graphic/MemoryGraphicStorage.js')
  , BodyLoader = require('../loaders/body/BinaryBodyLoader.js')
  , BodyStorage = require('../storage/body/MemoryBodyStorage.js')
  , WeaponLoader = require('../loaders/weapon/BinaryWeaponLoader.js')
  , WeaponStorage = require('../storage/weapon/MemoryWeaponStorage.js')
  , HeadLoader = require('../loaders/head/BinaryHeadLoader.js')
  , HeadStorage = require('../storage/head/MemoryHeadStorage.js')
  , HelmetLoader = require('../loaders/helmet/BinaryHelmetLoader.js')
  , HelmetStorage = require('../storage/helmet/MemoryHelmetStorage.js')
  , preloader = {};

/**
 * Using preload state to test some basic loader functionalities.
 * This method will later be deprecated and replaced in favour for
 * configurable states and state managers.
 * @
 */
preloader.preload = function () {
  var graphicStorage = new GraphicStorage()
    , bodyStorage = new BodyStorage()
    , helmetStorage = new HelmetStorage()
    , headStorage = new HeadStorage()
    , weaponStorage = new WeaponStorage()
    , graphicLoader = new GraphicLoader(this.game, graphicStorage)
    , bodyLoader = new BodyLoader(this.game, bodyStorage)
    , headLoader = new HeadLoader(this.game, headStorage)
    , helmetLoader = new HelmetLoader(this.game, helmetStorage)
    , weaponLoader = new WeaponLoader(this.game, weaponStorage);

  graphicLoader.load(null, function(storage) {
    console.info(storage.count() + ' graphics succesfully loaded.');
  });
  bodyLoader.load(null, function(storage) {
    console.info(storage.count() + ' bodies succesfully loaded.');
  });
  headLoader.load(null, function(storage) {
    console.info(storage.count() + ' heads succesfully loaded.');
  });
  helmetLoader.load(null, function(storage) {
    console.info(storage.count() + ' helmets succesfully loaded.');
  });
  weaponLoader.load(null, function(storage) {
    console.info(storage.count() + ' weapons succesfully loaded.');
  });

  this.game.load.image('logo', 'images/phaser.png#grunt-cache-bust');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
