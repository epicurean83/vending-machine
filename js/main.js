(function(window, document, vm) {

    function _shuffle(arr) {
        var index = arr.length,
            temp,
            targetIndex;

          while (0 !== index) {
            targetIndex = Math.floor(Math.random() * index);
            index -= 1;
        
            temp = arr[index];
            arr[index] = arr[targetIndex];
            arr[targetIndex] = temp;
          }
          return arr;
    }

    function _gernerateDemoProducts(data) {
        var Math = window.Math;

        data.forEach(function(row) {
            row.count = Math.floor(Math.random()*3) + 1;
        });

        return _shuffle(data);
    }

    var SLOT_LIMIT_MONEY = 3000,
        INITIAL_WALLET_MONEY = 10000,

        productElement = document.getElementById("productList"),
        consoleElement = document.getElementById("console"),
        slotElement = document.getElementById("slot"),
        walletElement = document.getElementById("wallet"),
    
        // demo data gernerate
        data = window.JSON.parse(document.getElementById("data").innerText),
        products = _gernerateDemoProducts(data);
        
    // initialize
    vm.CommandManager.getInstance().init();
    vm.Console.getInstance().init(consoleElement);
    vm.VendingMachine.getInstance()
        .init()
        .initProduct(productElement, products)
        .initSlot(slotElement, SLOT_LIMIT_MONEY)
        .initWallet(walletElement, INITIAL_WALLET_MONEY);

}(window, document, window.vm));