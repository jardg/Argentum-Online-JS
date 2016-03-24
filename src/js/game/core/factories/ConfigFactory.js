var ArgentumClient = require('../ArgentumClient')
  , fs = require('fs');

// Hack to compile Glob files. Don´t call this function!
function ಠ_ಠ() {
  require('../../config/**/*.js', { glob: true })
}

/**
 * ConfigFactory class - Defines this game's configuration manager
 * @param ao
 * @param path
 * @constructor
 */
var ConfigFactory = function ConfigFactory(ao, path) {

  /**
   * Save internal reference to AO Object
   * @type {ArgentumClient}
   */
  this.ao = ao;

  /**
   * Save all previous configuration objects inside this instance
   * or create a new configuration if none are found
   * @type {{}|*}
   */
  this.ao.configs = this.ao.configs || {};

  /**
   * Path in where configuration files are stored
   * @type {*|string}
   */
  this.path = path || this.ao.getConfigPath();

};

/**
 * Loads all configuration files using canonically
 * relatively named conventions (hooks WILL NEED to
 * set the internal {@see ConfigFactory#path} property).
 *
 * @param config
 * @param path
 * @returns {ConfigFactory}
 */
ConfigFactory.prototype.load = function(config, path) {
  var path = path || this.path
    , files = fs.readdirSync(__dirname + '/../../config/')
    , self = this;

  files.forEach(function(file) {
    var key = file.slice(0, -3);
    self.add(key);
  });

  return this;
};

/**
 * Obtains a configuration file or loads it if it was
 * not already loaded in our configs structure
 * @param config
 * @returns {*}
 */
ConfigFactory.prototype.get = function(config) {
  if(this.ao.configs.hasOwnProperty(config)) {
    return this.ao.configs[config];
  }

  throw new Error('[core/ConfigFactory.js@get]: Configuration file ' + config + 'not found in structure.');
};

/**
 * Adds a configuration file to our internal structure
 * or if one was already found it returns it
 *
 * @todo This method MUST merge configurations files whenever they are found inside our internal configurations structure
 *
 * @param {string} key
 * @param {string} [path]
 * @returns {*}
 */
ConfigFactory.prototype.add = function(key, path) {
  var config = require('../../config/' + key + '.js');

  return this.ao.configs[key] = config;
};

/**
 * Saves this module constructor into ArgentumClient object and exports it
 * @type {Function}
 */
module.exports = ConfigFactory;