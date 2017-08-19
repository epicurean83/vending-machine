(function(window, vm) {
    
    var Object = window.Object,
        View = vm.View,
        
        WalletView = function(elem) {
            View.call(this, elem);
        };

    WalletView.prototype = Object.assign(Object.create(View.prototype), {
        _events: {
            '.money-item-active click': '_onSelect',
            '.money-item-active contextmenu': '_onDrop',
        },

        _commands: {
            'insert-money-command': '_onInsertHandlers',
            'drop-money-command': '_onDropHandler',
            'return-money-command': '_onReturnHandler'
        },

        _onSelect: function(e) {
            var val = window.parseInt(e.target.dataset.value),
                cmd = null;

            vm.support.event.preventDefault(e);

            cmd = new vm.Command.InsertMoneyCommand(val);
            cmd.exec();
        },

        _onDrop: function(e) {
            var val = window.parseInt(e.target.dataset.value),
            cmd = null;

            vm.support.event.preventDefault(e);

            cmd = new vm.Command.DropMoneyCommand(val);
            cmd.exec();
        },

        _onInsertHandlers: {
            'inserted': function(e) {
                this.model.total -= e.data.current;
                this._onChange();
            }
        },

        _onDropHandler: function(e) {
            this.model.total -= e.data.current;
            this._onChange();
        },

        _onReturnHandler: {
            'return': function(e) {
                this.model.total += e.data.total;
                this._onChange();
            }
        },

        _onChange: function() {
            this._setState(this.model.total);
        },

        _render: function() {
            var html = [],
                total = this.model.total;

            html.push('<ul class="money-list">');
            [50, 100, 500, 1000].forEach(function(val) {
                if (val < total) {
                    html.push('  <li class="money-item"><a class="money-item-active" href="#" data-value="'+val+'">'+val+'원</a></li>');
                } else {
                    html.push('  <li class="money-item">'+val+'원</li>');
                }
            });
            html.push('</ul>');
            html.push('<div class="left-money-wrap">');
            html.push('  지금 내돈: ');
            html.push('  <span class="left-money">');
            html.push('    '+total+'원');
            html.push('  </span>');
            html.push('</div>');

            this.elem.innerHTML = html.join('');
        }
    });

    WalletView.prototype.constructor = WalletView;
    
    View.WalletView = WalletView;

}(window, window.vm));