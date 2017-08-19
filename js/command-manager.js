(function(window, vm) {
    
    function _camelToDash(str) {
        return str.replace(/\W+/g, '-')
          .replace(/([a-z\d])([A-Z])/g, '$1-$2')
          .toLowerCase();
    }
    
    function _dashToCamel(str) {
        return str.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
        });
    }
    
    vm.CommandManager = (function() {
        var instance = null,
            Object = window.Object,

            CommandManager = function() {
                this.commandTypes = {};
                this.listeners = {};
            };
    
        CommandManager.prototype = {
            init: function() {
                var commands = vm.Command;
                Object.keys(commands).forEach(function(key) {
                    this._registerCommand(_camelToDash(key), commands[key]);
                }, this);
                return this;
            },

            _registerCommand: function(name, command) {
                if (this.commandTypes[name]) {
                    throw name + ' command is already registered!'
                }

                this.commandTypes[name] = command;
                command.prototype.__name = name;
            },

            trigger: function(name, type, data) {
                var listeners = this.listeners[name];
                if (listeners) {
                    listeners.forEach(function(callback) {
                        callback({
                            type: type,
                            data: data
                        });
                    }, this);
                }
            },

            addListener: function(name, callback) {
                // 사용자에 따라 변동되는 값이 아닐 경우 필요 없지만...
                if (!this.commandTypes[name]) {
                    throw 'Could not found Command! ['+name+']'
                }

                var listeners = this.listeners[name];
                if (!listeners) {
                    listeners = [];
                }
                listeners.push(callback);
                this.listeners[name] = listeners;
            },

            removeListener: function(name, callback) {
                if (!this.commandTypes[name]) {
                    throw 'Could not found Command! ['+name+']'
                }

                var listeners = this.listeners[name];
                if (listeners) {
                    listeners = listeners.filter(function(v) {
                        return v !== callback;
                    });
                    this.listeners[name] = listeners;
                }
            }
        };

        return {
            getInstance: function() {
                if (instance == null) {
                    instance = new CommandManager();
                }
                return instance;
            }
        };

    } ());

}(window, window.vm));