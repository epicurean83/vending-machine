(function(document, vm) {
    
    vm.Console = (function() {
        var instance = null,

            Console = function() {
                this.elem = null;
            };
    
        Console.prototype = {
            init: function(elem) {
                this.elem = elem;
                return this;
            },

            log: function(txt) {
                var row = document.createElement("li");
                row.className = 'console-row';
                row.innerHTML = txt;

                this.elem.appendChild(row);
                this.elem.scrollTop = this.elem.scrollHeight;
            }
        };

        return {
            getInstance: function() {
                if (instance == null) {
                    instance = new Console();
                }
                return instance;
            }
        };

    } ());

}(window.document, window.vm));