(function(vm) {
    
    var Object = window.Object,
        Command = vm.Command,

        GetProductCommand = function(product) {
            Command.call(this);
            this.product = product;
        };
    
    GetProductCommand.prototype = Object.assign(Object.create(Command.prototype), {

        exec: function() {
            var vendingMachine = vm.VendingMachine.getInstance(),
                totalMoney = vendingMachine.getCurrentTotalMoney(),
                product = this.product;

            if (product.count < 1) {
                this._trigger(GetProductCommand.EVENT.EMPTY, product);
            } else {
                vendingMachine.getProduct(product);
                this._trigger(GetProductCommand.EVENT.SUCCESS, product);
            }
        }

    });

    GetProductCommand.prototype.constructor = GetProductCommand;

    GetProductCommand.EVENT = {
        SUCCESS: {
            eventName: 'success',
            message: '{name} 상품이 나왔습니다.'
        },
        EMPTY: {
            eventName: 'empty',
            message: '이미 {name} 상품은 품절되었습니다.'
        }
    };

    Command.GetProductCommand = GetProductCommand;

    }(window.vm));