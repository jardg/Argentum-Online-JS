var GraphicLoader = require('../loaders/GraphicLoader.js')
  , GraphicStorage = require('../storage/graphic/MemoryGraphicStorage.js')
  , preloader = {};

preloader.preload = function () {
  var graphicStorage = new GraphicStorage()
    , graphicLoader = new GraphicLoader(this.game, graphicStorage);

  graphicLoader.load(null, function(storage) {
    console.log(storage.count() + ' graphics succesfully loaded.');
  });
  this.game.load.image('logo', 'images/phaser.png#grunt-cache-bust');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
