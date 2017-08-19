(function(vm) {
    
    var Object = window.Object,
        Command = vm.Command,

        SelectProductCommand = function(product) {
            Command.call(this);
            this.product = product;
        };
    
    SelectProductCommand.prototype = Object.assign(Object.create(Command.prototype), {

        exec: function() {
            var totalMoney = vm.VendingMachine.getInstance().getCurrentTotalMoney(),
                product = this.product;

            if (totalMoney < product.price) {
                this._trigger(SelectProductCommand.EVENT.DISABLE, product);
            } else {
                this._trigger(SelectProductCommand.EVENT.SELECT, product);
            }
        }

    });

    SelectProductCommand.prototype.constructor = SelectProductCommand;

    SelectProductCommand.EVENT = {
        SELECT: {
            eventName: 'selected',
            message: '{name}이 선택되었습니다.'
        },
        DISABLE: {
            eventName: 'disable',
            message: '금액이 부족합니다. {name}의 가격은 {price}원 입니다.'
        }
    };

    Command.SelectProductCommand = SelectProductCommand;

    }(window.vm));