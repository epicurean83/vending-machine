(function(document, vm) {
    
    vm.VendingMachine = (function() {

        var instance = null,
            View = vm.View,
            
            VendingMachine = function() {
                this.totalMoney = 0;
                this.limitMoney = 0;

                this.views = [];
            };

        VendingMachine.prototype = {
            init: function() {
                return this;
            },

            initProduct: function(productListWrap, products) {
                this._initProductView(productListWrap, products);
                return this;
            },

            initSlot: function(slotWrap, limit) {
                this.limitMoney = limit;
                this._initSlotView(slotWrap, {
                    total: this.totalMoney
                });
                return this;
            },

            initWallet: function(walletWrap, money) {
                this._initWalletView(walletWrap, {
                    total: money
                });
                return this;
            },

            _initProductView: function(productListWrap, products) {
                // 렌더링을 효과적으로 하기 위햐여 fregment 사용
                var fragment = document.createDocumentFragment();
                products.forEach(function(product) {
                    var elem = document.createElement('li'),
                        view = new View.ProductView(elem);
                    
                    view.setModel(product);
                    this.addView(view);
                    fragment.appendChild(elem);
                }, this);

                productListWrap.appendChild(fragment);
            },

            _initSlotView: function(slotWrap, model) {
                var view = new View.SlotView(slotWrap);
                view.setModel(model);
                this.addView(view);
            },

            _initWalletView: function(walletWrap, model) {
                var view = new View.WalletView(walletWrap);
                view.setModel(model);
                this.addView(view);
            },

            addView: function(view) {
                this.views.push(view);
            },

            insertMoney: function(money) {
                this.totalMoney += money;
            },

            getProduct: function(product) {
                this.totalMoney -= product.price;
                product.count -= 1;
            },

            returnMoney: function() {
                this.totalMoney = 0;
            },

            getCurrentTotalMoney: function() {
                return this.totalMoney;
            },

            getLimitMoney: function() {
                return this.limitMoney;
            },

            destroy: function() {
                this.views.forEach(function(view) {
                    view.destroy();
                });
                this.views = null;
                this.products = null;
            }
        };

        return {
            getInstance: function() {
                if (instance == null) {
                    instance = new VendingMachine();
                }
                return instance;
            }
        };
    }());
    
}(window.document, window.vm));