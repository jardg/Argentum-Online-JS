var ArgentumClient = require('./ArgentumClient')
  , fs = require('fs');

// Hack to compile Glob files. Don´t call this function!
function ಠ_ಠ() {
  require('./factories/**/*.js', { glob: true })
}


/**
 * ClientFactory class
 * @param {Argentum} ao
 * @param {string} [path="./factories/"]
 * @constructor
 */
var ClientFactory = function ClientFactory(ao, path) {

  /**
   * Instance of game object to factorize
   * @type {Argentum}
   */
  this.ao = ao;

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
 *
 * @todo don't hardcode readdirSync location
 * @param path
 */
ClientFactory.prototype.load = function(path) {
  var path = path || this.path
    , files = fs.readdirSync(__dirname + '/factories/')
    , self = this;

  files.forEach(function(file) {
    var key = file.slice(0, -10).toLowerCase()
      , driver = require('./factories/' + file);

    key = (key === 'gameobject') ? 'add' : key;
    self.ao[key] = new driver(self.ao);
  });

  return this;
}

/**
 * Exports this module's constructor
 * @type {Function}
 */
ArgentumClient.ClientFactory = ClientFactory;
module.exports = ClientFactory;