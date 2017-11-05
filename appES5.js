var healthController = (function() {

    var data = {
        player1: 20,
        player2: 20
    };

    return {
        increasePlayerHealth: function(player) {
            data[player] += 1;
        },
        decreasePlayerHealth: function(player) {
            data[player] -= 1;
        },
        getPlayerHealth: function(player) {
            return data[player];
        }
    };
})();

var UIController = (function() {

    var DOMstrings = {
        player1_Health: '.healthCounter__player1',
        player2_Health: '.healthCounter__player2',
        player1_increaseHealth: '.increaseHealth__player1',
        player1_decreaseHealth: '.decreaseHealth__player1',
        player2_increaseHealth: '.increaseHealth__player2',
        player2_decreaseHealth: '.decreaseHealth__player2'
    };

    return {
        setValue: function(amount, player) {
            var DOMside = player === 'player1' ? DOMstrings.player1_Health : DOMstrings.player2_Health;
            document.querySelector(DOMside).textContent = amount;
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


var controller = (function(UICtrl, healthCtrl) {


    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.player1_increaseHealth).addEventListener('click', function() {
            increaseHealth('player1');
        });

        document.querySelector(DOM.player1_decreaseHealth).addEventListener('click', function() {
            decreaseHealth('player1');
        });

        document.querySelector(DOM.player2_increaseHealth).addEventListener('click', function() {
            increaseHealth('player2');
        });

        document.querySelector(DOM.player2_decreaseHealth).addEventListener('click', function() {
            decreaseHealth('player2');
        });
    };

    var increaseHealth = function(player) {
        healthCtrl.increasePlayerHealth(player);
        var currentHealth = healthCtrl.getPlayerHealth(player);
        UICtrl.setValue(currentHealth, player);
    };

    var decreaseHealth = function(player) {
        healthCtrl.decreasePlayerHealth(player);
        var currentHealth = healthCtrl.getPlayerHealth(player);
        UICtrl.setValue(currentHealth, player);
    };

    return {
        init: function() {
            console.log('Application has started!');
            setupEventListeners();
        }
    };
})(UIController, healthController);

controller.init();
