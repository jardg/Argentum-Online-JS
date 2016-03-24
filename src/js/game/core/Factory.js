/**
 * Factory class
 * @param ao
 * @param path
 * @constructor
 */
var Factory = function Factory(object, path) {

  /**
   * Instance of game object to factorize
   * @type {Argentum}
   */
  this.object = object;

  /**
   * Sets the path for where to seek factories
   * @type {*|string}
   */
  this.path = path || './factories/';

  // Loads all factories
  this.load();

};

/**
 * Loads all factories in a given path
 * @param path
 */
Factory.prototype.load = function(path) {
  var path = path || this.path
    , files = ['ConfigFactory.js', 'GameObjectFactory.js', 'ManagerFactory.js']
    , self = this;

  files.forEach(function(factory) {
    var key = factory.slice(0, -10).toLowerCase();
    var factory = require(path + factory);

    self.object[key] = new factory();
    self.object[key].load(self.object);
  });
}

/**
 * Exports Factory constructor and saves to Argentum instance
 * @type {Function}
 */
module.exports = Factory;