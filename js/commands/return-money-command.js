(function(vm) {
    
    var Object = window.Object,
        Command = vm.Command,

        ReturnMoneyCommand = function() {
            Command.call(this);
        };
    
    ReturnMoneyCommand.prototype = Object.assign(Object.create(Command.prototype), {

        exec: function() {
            var vendingMachine = vm.VendingMachine.getInstance(),
                data = {
                    total: vendingMachine.getCurrentTotalMoney()
                };

            if (data.total > 0) {
                vendingMachine.returnMoney();
                this._trigger(ReturnMoneyCommand.EVENT.RETURN, data);
            } else {
                this._trigger(ReturnMoneyCommand.EVENT.EMPTY, data);
            }
        }

    });

    ReturnMoneyCommand.prototype.constructor = ReturnMoneyCommand;
    
    ReturnMoneyCommand.EVENT = {
        RETURN: {
            eventName: 'return',
            message: '{total}원이 반환되었습니다.'
        },
        EMPTY: {
            eventName: 'empty',
            message: '반환될 금액이 없습니다.'
        }
    };
    
    Command.ReturnMoneyCommand = ReturnMoneyCommand;

    }(window.vm));