/**
 * Module dependencies
 * @type {*|exports|module.exports}
 */
var EventManager = require('../managers/EventManager.js')
  , Phaser = require('Phaser')
  , _ = require('lodash');

/**
 * Constructor for game Textures Loader
 * @param game
 * @param storage
 * @param path
 * @constructor
 */
var TextureLoader = function TextureLoader(game, storage, path) {
  this.game = game;
  this.config = this.game.ao.config.get('texture');
  this._storage = storage || new this.config.storage();
  this._path = path || this.config.path;
  EventManager.eventify(this);
};

/**
 * Generates a texture filename using value of format in
 * textures configuration file and appending the result
 * to the previously loaded path string
 * @param mapId
 * @returns {string}
 */
TextureLoader.prototype.getImagePath = function(image) {
  return this._path + this.config.format.replace(/\{number}/, image.toString());
};

/**
 * Performs the load of a single texture image file
 * @param {Graphic} graphic - Graphic to load texture into memory
 * @param {function} onLoaded(graphic, texture)
 * @returns {*}
 */
TextureLoader.prototype.load = function(graphic, onLoaded) {
  if(! graphic.fileNumber) return null;

  // Recursively load all framed animation textures
  if(graphic.frames.length > 0) {
    var self = this;
    _.each(graphic.frames, function(frame, key) {
      var graphic = self.game.ao.managers.graphic.get(frame);
      graphic.frames[key] = graphic;
      self.load(graphic, onLoaded);
    });

    return null;
  }

  var path = this.getImagePath(graphic.fileNumber);
  var texture = new PIXI.Texture.fromImage(path, false, PIXI.scaleModes.NEAREST);
  texture.setFrame(new PIXI.Rectangle(
    graphic.sourceX, graphic.sourceY,
    graphic.pixelWidth, graphic.pixelHeight
  ));
  graphic.texture = texture;

  PIXI.Texture.addTextureToCache(texture.BaseTexture, String.valueOf(graphic.grh));
  return onLoaded(graphic, texture);
};

/**
 * Exports object constructor
 * @type {Function}
 */
module.exports = TextureLoader;