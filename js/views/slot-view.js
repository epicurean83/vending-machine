(function(window, vm) {
    
    var Object = window.Object,
        View = vm.View,
        
        SlotView = function(elem) {
            View.call(this, elem);
        };

    SlotView.prototype = Object.assign(Object.create(View.prototype), {
        _events: {
            '.return-btn click': '_onClickReturn'
        },

        _commands: {
            'insert-money-command': '_onChange',
            'return-money-command': '_onChange',
            'get-product-command': '_onChange'
        },

        _onClickReturn: function(e) {
            vm.support.event.preventDefault(e);

            var cmd = new vm.Command.ReturnMoneyCommand();
            cmd.exec();
        },

        _onChange: function() {
            var total = vm.VendingMachine.getInstance().getCurrentTotalMoney();
            this.model.total = total;
            this._setState(total);
        },

        _render: function() {
            var html = [],
                total = this.model.total;

            html.push('<p class="total-money">'+total+' 원</p>');
            if (total > 0) {
                html.push('<button class="return-btn">반환버튼</button>');
            } else {
                html.push('<button class="return-btn return-btn-disabled">반환버튼</button>');
            }

            this.elem.innerHTML = html.join('');
        }
    });

    SlotView.prototype.constructor = SlotView;
        
    View.SlotView = SlotView;

}(window, window.vm));