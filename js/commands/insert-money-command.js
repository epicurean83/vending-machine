(function(vm) {
    
    var Object = window.Object,
        Command = vm.Command,

        InsertMoneyCommand = function(money) {
            Command.call(this);
            this.money = money;
        };
    
        InsertMoneyCommand.prototype = Object.assign(Object.create(Command.prototype), {

        exec: function() {
            var vendingMachine = vm.VendingMachine.getInstance(),
                data = {
                    limit: vendingMachine.getLimitMoney(),
                    total: vendingMachine.getCurrentTotalMoney(),
                    current: this.money
                };
            
            if (data.current + data.total <= data.limit) {
                vendingMachine.insertMoney(data.current);
                this._trigger(InsertMoneyCommand.EVENT.INSERTED, data);
            } else {
                this._trigger(InsertMoneyCommand.EVENT.FULL, data);
            }
        },

    });

    InsertMoneyCommand.prototype.constructor = InsertMoneyCommand;

    InsertMoneyCommand.EVENT = {
        INSERTED: {
            eventName: 'inserted',
            message: '{current}원을 넣었습니다.'
        },
        FULL: {
            eventName: 'full',
            message: '한도금액 {limit}을 초과 하였습니다. 돈이 더이상 안 들어갑니다.'
        }
    };


    Command.InsertMoneyCommand = InsertMoneyCommand;

    }(window.vm));