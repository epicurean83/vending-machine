(function(window, vm) {
    var Object = window.Object;

    /* 표준 메소드의 경우 Pollyfill 형태로 제공 */
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target),
                    index,
                    nextSource,
                    nextKey;

                for (index = 1; index < arguments.length; index++) {
                    nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }

    /* 기타 브라우저 버그나 다른 spec관련해서는 따로 메소드 구현 */
    vm.support = {
        browser: {

        },
        cssPriffix: '',
        
        event: {
            preventDefault: function(event) {
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            },
            which: function(event) {
                return event.which ? event.which : event.button;
            }
        }
        
    }

}(window, window.vm));