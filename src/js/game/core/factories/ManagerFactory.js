/**
 * Module dependencies
 * @type {ArgentumClient}
 */
var ArgentumClient = require('../ArgentumClient')
  , fs = require('fs');

// Hack to compile Glob files. Don´t call this function!
function ಠ_ಠ() {
  require('../../managers/**/*.js', { glob: true })
}

/**
 * Obtains or instantiates all managers found in a directory {path}
 * @param ao
 * @param path
 * @constructor
 */
var ManagerFactory = function ManagerFactory(ao, path) {

  /**
   * Saves an instance of our main game object
   * @type {ArgentumClient}
   */
  this.ao = ao;

  /**
   * Saves the full or relative path for where managers are stored
   * @type {string}
   */
  this.path = path || this.ao.getManagersPath();

  /**
   * Initialize managers structure inside ArgentumClient
   * @type {{}|*}
   */
  this.ao.managers = this.ao.managers || {};

  /**
   * Initialize storage structure inside ArgentumClietn
   * @type {*|Function|{}|MemoryMapStorage}
   */
  this.ao.storage = this.ao.storage || {};

};

/**
 * Capitalizes the first word of a string
 * @todo move this shit outta here
 * @returns {string}
 */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

/**
 * Gets a manager driver using a key and a path in where to search
 * @param {string} file
 * @param {string} key
 * @returns {*}
 */
ManagerFactory.prototype.add = function(file, key) {
  var file = this.path + file
    , driver = require(file);

  return this.ao.add.manager(key, driver);
};

/**
 * Reads a given path for files and adds them to ArgentumClient
 * managers structure
 * @param [path=this.path]
 * @returns {{}}
 */
ManagerFactory.prototype.load = function(path) {
  var managers = fs.readdirSync(__dirname + '/../../managers/')
    , self = this;

  managers.forEach(function(file) {
    var key = file.slice(0, -10).toLowerCase();
    self.add(file, key);
  });

  return this.ao.managers;
}

/**
 * Exports this module constructor
 * @type {Function}
 */
module.exports = ManagerFactory;