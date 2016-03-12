var GraphicLoader = require('../loaders/graphic/BinaryGraphicLoader.js')
  , GraphicStorage = require('../storage/graphic/MemoryGraphicStorage.js')
  , BodyLoader = require('../loaders/body/BinaryBodyLoader.js')
  , BodyStorage = require('../storage/body/MemoryBodyStorage.js')
  , HeadLoader = require('../loaders/head/BinaryHeadLoader.js')
  , HeadStorage = require('../storage/head/MemoryHeadStorage.js')
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
    , headStorage = new HeadStorage()
    , graphicLoader = new GraphicLoader(this.game, graphicStorage)
    , bodyLoader = new BodyLoader(this.game, bodyStorage)
    , headLoader = new HeadLoader(this.game, headStorage);

  graphicLoader.load(null, function(storage) {
    console.info(storage.count() + ' graphics succesfully loaded.');
  });
  bodyLoader.load(null, function(storage) {
    console.info(storage.count() + ' bodies succesfully loaded.');
  });
  headLoader.load(null, function(storage) {
    console.info(storage.count() + ' heads succesfully loaded.');
  });

  this.game.load.image('logo', 'images/phaser.png#grunt-cache-bust');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
