var GraphicLoader = require('../loaders/graphic/BinaryGraphicLoader.js')
  , GraphicStorage = require('../storage/graphic/MemoryGraphicStorage.js')
  , BodyLoader = require('../loaders/body/BinaryBodyLoader.js')
  , BodyStorage = require('../storage/body/MemoryBodyStorage.js')
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
    , graphicLoader = new GraphicLoader(this.game, graphicStorage)
    , bodyLoader = new BodyLoader(this.game, bodyStorage);

  graphicLoader.load(null, function(storage) {
    console.info(storage.count() + ' graphics succesfully loaded.');
  });
  bodyLoader.load(null, function(storage) {
    console.info(storage.count() + ' bodies succesfully loaded.');
  });

  this.game.load.image('logo', 'images/phaser.png#grunt-cache-bust');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
