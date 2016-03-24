/**
 * Module dependencies
 * @type {Argentum|fs|exports|module.exports}
 */
var Argentum = require('../Argentum')
  , fs = require('fs');

/**
 * ConfigFactory class - Defines this game's configuration manager
 * @param ao
 * @param path
 * @constructor
 */
var ConfigFactory = function ConfigFactory(ao, path) {

  /**
   * Save internal reference to AO Object
   * @type {Argentum}
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
  this.path = path || '../config/';

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
  var files = fs.readdirSync(path || this.path)
    , self = this;

  files.forEach(function(fileName) {
    console.log(fileName);
    self.add(fileName, path || this.path);
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
 * @param config
 * @returns {*}
 */
ConfigFactory.prototype.add = function(config, path) {
  return this.ao.configs[config] = require((path || this.path) + config);
};

/**
 * Saves this module constructor into Argentum object and exports it
 * @type {Function}
 */
Argentum.ConfigFactory = ConfigFactory;
module.exports = ConfigFactory;