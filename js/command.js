(function(window, vm) {

    var Object = window.Object,
        Command = function() {
        this.console = vm.Console.getInstance();
        this.commandManager = vm.CommandManager.getInstance();
    };

    Command.prototype = {
        __name: null,

        exec: function() {
            /* abstract method */
        },

        _log: function(message, data) {
            if (data) {
                Object.keys(data).forEach(function(prop) {
                    message = message.replace('{'+prop+'}', data[prop]);
                });
            }
            this.console.log(message);
        },

        _trigger: function(type, data) {
            this._log(type.message, data);
            this.commandManager.trigger(this.getName(), type.eventName, data);
        },

        addListener: function(callback) {
            this.commandManager.addListener(this.getName(), callback);
        },

        removeListener: function(callback) {
            this.commandManager.removeListener(this.getName(), callback);
        },

        getName: function() {
            return this.__name;
        }

    };

    vm.Command = Command;

}(window, window.vm));