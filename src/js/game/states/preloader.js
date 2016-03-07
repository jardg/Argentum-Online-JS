var GraphicLoader = require('../loaders/graphic/BinaryGraphicLoader.js')
  , GraphicStorage = require('../storage/graphic/MemoryGraphicStorage.js')
  , BodyLoader = require('../loaders/graphic/BinaryBodyLoader.js')
  , BodyStorage = require('../storage/graphic/MemoryBodyStorage.js')
  , preloader = {};

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
