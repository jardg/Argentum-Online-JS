/**
 * Node dependencies
 * @type {exports|module.exports}
 * @private
 */
var _ = require('lodash');

/**
 * Constructor for the Events Manager
 * @constructor
 */
var EventManager = function() {
  this._listeners = {};
};

/**
 * EventManager prototype interface
 * @type {{fire: Function, addListener: Function,
 *         removeListener: Function, hasListeners: Function}}
 */
EventManager.prototype = {

  /**
   * Fires a listener type to it's addressed callbacks
   * @param name
   * @param args
   * @param scope
   * @returns {EventManager}
   */
  fire: function(name, args, scope) {
    var listeners = this._listeners[name];
    var scope = scope || window;
    args = args || [];

    if(listeners !== undefined) {
      var data = {}, evt;
      for(var i = 0, len = listeners.length; i < len; i++) {
        evt = new EventManager.EventArg(name, data);

        listeners[i].apply(scope, args.concat(evt));

        data = evt.data;
        if(evt.removed) {
          listeners.splice(i, 1);
          len = listeners.length;
          --i;
        }
        if(evt.cancelled) {
          break;
        }
      }
    }

    return this;
  },

  /**
   * Adds listener callback to internal listeners array
   * @param type
   * @param callback
   * @returns {EventManager}
   */
  addListener : function(name, callback) {
    (this._listeners[name] = this._listeners[name] || []).push(callback || function() {});
    return this;
  },

  /**
   * Removes a listener from the internal listeners array
   * @param name
   * @param fn
   * @returns {EventManager}
   */
  removeListener : function(name, fn) {
    if(arguments.length === 1) { // remove all
      this._listeners[name] = [];
    }
    else if(typeof(fn) === 'function') {
      var listeners = this._listeners[name];
      if(listeners !== undefined) {
        var foundAt = -1;
        for(var i = 0, len = listeners.length; i < len && foundAt === -1; i++) {
          if(listeners[i] === fn) {
            foundAt = i;
          }
        }

        if(foundAt >= 0) {
          listeners.splice(foundAt, 1);
        }
      }
    }

    return this;
  },

  /**
   * Determines if the given name has attached listeners to it
   * @param name
   * @returns {boolean}
   */
  hasListeners: function(name) {
    return (this._listeners[name] === undefined ? 0 : this._listeners[name].length) > 0;
  }

};

/**
 * Eventifies a given object making it able to receive
 * listener callbacks and all of the above methods by
 * itself.
 *
 * @param object
 * @param manager
 * @returns {*|EventManager}
 */
EventManager.eventify = function(object, manager) {
  var methods = EventManager.eventify.methods;
  manager = manager || new EventManager();

  for(var i = 0, len = methods.length; i < len; i++) (function(method) {
    object[method] = function() {
      return manager[method].apply(manager, arguments);
    };
  })(methods[i]);

  return manager;
};
EventManager.eventify.methods = ['addListener', 'removeListener', 'fire'];

/**
 * Holds event arguments for an event name
 *
 * @param name
 * @param data
 * @constructor
 */
EventManager.EventArg = function(name, data) {
  this.name = name;
  this.data = data;
  this.cancelled = false;
  this.removed = false;
};

/**
 * Events arguments prototype interface
 *
 * @type {{cancel: Function, remove: Function}}
 */
EventManager.EventArg.prototype = {
  cancel : function() {
    this.cancelled = true;
  },
  remove : function() {
    this.removed = true;
  }
};

/**
 * Exports this object
 * @type {Function}
 */
module.exports = EventManager;