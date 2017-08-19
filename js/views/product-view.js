(function(window, vm) {
    
    var Object = window.Object,
        View = vm.View,
        
        ProductView = function(elem) {
            View.call(this, elem);
        };

    ProductView.prototype = Object.assign(Object.create(View.prototype), {
        _events: {
        'a click': '_onSelect'
        },

        _commands: {
            'insert-money-command': '_onChange',
            'return-money-command': '_onChange',
            'get-product-command': '_onChange',
            'select-product-command': '_onSelectedHandlers',
            'get-product-command': '_onProductChangedHandlers'
        },

        _onSelect: function(e) {
            var cmd = new vm.Command.SelectProductCommand(this.model);

            vm.support.event.preventDefault(e);
            
            cmd.exec();
        },

        _onSelectedHandlers: {
            "selected": function(e) {
                if (e.data.id === this.model.id) {
                    var cmd = new vm.Command.GetProductCommand(this.model);
                    cmd.exec();
                }
            }
        },

        _onProductChangedHandlers: {
            "success": function(e) {
                this._onChange();
            }
        },

        _onChange: function() {
            var model = this.model,
                totalMoney = vm.VendingMachine.getInstance().getCurrentTotalMoney(),
                newState = null;

            if (model.count < 1) {
                newState = ProductView.STATE.EMPTY;
            } else if (model.price <= totalMoney) {
                newState = ProductView.STATE.ENABLE;
            } else {
                newState = ProductView.STATE.NORMAL;
            }

            this._setState(newState);
        },

        _render: function() {
            this.elem.className = 'product';
            this.elem.innerHTML = this.currentState.render(this.model);
        }
    });

    ProductView.prototype.constructor = ProductView;
    
    // 상황별로 좀더 다이나믹하게 변화 가능
    ProductView.STATE = {
        NORMAL: {
            render: function(model) {
                return '\
                    <a href="#">\
                        <div class="product-'+model.id+' product-img" data-left="'+model.count+'">'+model.name+'</div>\
                        <span class="product-price">'+model.price+'</span>\
                    </a>';
            }
        },
        EMPTY: {
            render: function(model) {
                return '\
                    <a href="#">\
                        <div class="product-'+model.id+' product-img product-empty">'+model.name+'</div>\
                        <span class="product-price product-empty">'+model.price+'</span>\
                        <span class="product-empty-mark">품절</span>\
                    </a>';
            }
        },
        ENABLE: {
            render: function(model) {
                return '\
                    <a href="#">\
                        <div class="product-'+model.id+' product-img product-enable">'+model.name+'</div>\
                        <span class="product-price product-enable">'+model.price+'</span>\
                    </a>';
            }
        }
    };
    
    View.ProductView = ProductView;

}(window, window.vm));