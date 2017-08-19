(function(document, vm) {
    
    var View = function(elem) {
        this.elem = elem;
        this.model = null;
        
        this.currentState = null;
        this.eventHandler = {};
        this.commandHandler = {};

        this._init();
    };

    // private method 요런 식으로도 사용가능... 원래 이건 Object.keys().forEach 로 처리 가능.
    function _forEach(obj, callback) {
        if (!obj) {
            return;
        }

        for(o in obj) {
            if (obj.hasOwnProperty(o)) {
                callback(o, obj[o]);
            }                
        }
    }

    View.prototype = {
        _events: null, /* abstract method */
        _commands: null, /* abstract method */

        _init: function() {
            this._eventBind(this._events);
            this._commandBind(this._commands);
        },

        _eventBind: function(events) {
            var self = this;

            _forEach(events, function(event, handler) {
                var token = event.split(" "),
                    eventName = token.pop(),
                    target = token.join(" "),
                    callback = function(e) {
                        var t = e.target;
                        while (t && t != self.elem && t != document.body) {
                            if (t.matches(target)) {
                                /* override event target element */
                                e.target = t;
                                self[handler].call(self, e);
                                return;
                            }
                            t = t.parentNode;
                        }
                    },
                    callbacks = self.eventHandler[eventName];
                
                if (!callbacks) {
                    callbacks = [];
                }

                callbacks.push(callback);
                self.eventHandler[eventName] = callbacks;

                self.elem.addEventListener(eventName, callback, false);
            });
        },

        _eventUnBind: function() {
            _forEach(this.eventHandler, function(event, handler) {
                this.elem.removeEventListener(event, handler, false);
            }.bind(this));
        },

        _commandBind: function(commands) {
            var commandManager = vm.CommandManager.getInstance();
            _forEach(commands, function(command, handler) {
                var callback = null,
                    o = this[handler];

                /* reflection */
                if (typeof o == 'function') {
                    callback = o.bind(this);
                } else {  /* object.. handlers 등록 */
                    callback = function(e) {
                        /* switch문 보다 요런식의 {}를 이용한 방법이 빠르다는 말도.. */
                        if (o[e.type]) {
                            callback = o[e.type].call(this, e);
                        }
                    }.bind(this);
                }
                this.commandHandler[command] = callback;
                commandManager.addListener(command, callback);
            }.bind(this));
        },
        
        _commandUnBind: function() {
            var commandManager = vm.CommandManager.getInstance();
            _forEach(this.commandHandler, function(command, handler) {
                commandManager.removeListener(command, handler);
            });
        },

        setModel: function(model) {
            this.model = model;
            this._onChange();
        },

        _setState: function(state) {
            var oldState = this.currentState;
            this.currentState = state;
            
            // 불필요한 렌더링 감소
            if (oldState != state) {
                this._render();
            }
        },

        _onChange: function() {
            /* abstract method */
        },
        _render: function() {
            /* abstract method */
        },

        destory: function() {
            this._eventUnBind(this.events);
            this._commandUnBind(this.commands);

            this.elem = null;
            this.model = null;
            
            this.currentState = null;
            this.eventHandler = null;
            this.commandHandler = null;
        }
    };

    vm.View = View;

}(window.document, window.vm));