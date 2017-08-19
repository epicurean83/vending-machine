(function(vm) {
    
    var Object = window.Object,
        Command = vm.Command,

        DropMoneyCommand = function(money) {
            Command.call(this);
            this.money = money;
        };
    
    DropMoneyCommand.prototype = Object.assign(Object.create(Command.prototype), {

        exec: function() {
            var vendingMachine = vm.VendingMachine.getInstance(),
            data = {
                current: this.money
            };

            this._trigger(DropMoneyCommand.EVENT.DROPED, data);
        }

    });

    DropMoneyCommand.prototype.constructor = DropMoneyCommand;

    DropMoneyCommand.EVENT = {
        DROPED: {
            eventName: 'droped',
            message: '{current}원을 떨어뜨리셨습니다.'
        }
    }

    Command.DropMoneyCommand = DropMoneyCommand;

    }(window.vm));