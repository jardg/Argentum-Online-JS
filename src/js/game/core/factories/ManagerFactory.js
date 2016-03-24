/**
 * Module dependencies
 * @type {Argentum}
 */
var Argentum = require('../Argentum');

/**
 * Obtains or instantiates all managers found in a directory {path}
 * @param ao
 * @param path
 * @constructor
 */
var ManagerFactory = function ManagerFactory(ao, path) {

  /**
   * Saves an instance of our main game object
   * @type {Argentum}
   */
  this.ao = ao;

  /**
   * Saves the full or relative path for where managers are stored
   * @type {string}
   */
  this.path = path || this.ao.getManagersPath();

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
  var file = this.path + '/' + file;

  return this.game.ao.add.manager(key.toLowerCase(), require(file));
};

/**
 * Reads a given path for files and adds them to Argentum
 * managers structure
 * @param [path=this.path]
 * @returns {{}}
 */
ManagerFactory.prototype.load = function(path) {
  var path = path || this.path
    , managers = fs.readdirSync(path)
    , self = this;

  managers.forEach(function(file) {
    var key = file.slice(0, -10);
    console.log(key);

    if(key === 'Manager.js') {
      self.add(file, key);
    }
  });

  return this.game.ao.managers;
}

/**
 * Exports this module constructor
 * @type {Function}
 */
Argentum.ManagerFactory = ManagerFactory;
module.exports = ManagerFactory;