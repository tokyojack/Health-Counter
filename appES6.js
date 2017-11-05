const healthController = (() => {

    let data = {
        player1: 20,
        player2: 20
    };

    return {
        increasePlayerHealth: player => {
            data[player] += 1;
        },
        decreasePlayerHealth: player => {
            data[player] -= 1;
        },
        getPlayerHealth: player => {
            return data[player];
        }
    };
})();

const UIController = (() => {

    const DOMstrings = {
        player1_Health: '.healthCounter__player1',
        player2_Health: '.healthCounter__player2',
        player1_increaseHealth: '.increaseHealth__player1',
        player1_decreaseHealth: '.decreaseHealth__player1',
        player2_increaseHealth: '.increaseHealth__player2',
        player2_decreaseHealth: '.decreaseHealth__player2'
    };

    return {
        setValue: (amount, player) => {
            const DOMside = player === 'player1' ? DOMstrings.player1_Health : DOMstrings.player2_Health;
            document.querySelector(DOMside).textContent = amount;
        },
        getDOMstrings: () => {
            return DOMstrings;
        }
    };

})();


const controller = ((UICtrl, healthCtrl) => {


    const setupEventListeners = () => {
        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.player1_increaseHealth).addEventListener('click', () => increaseHealth('player1'));
        document.querySelector(DOM.player1_decreaseHealth).addEventListener('click', () => decreaseHealth('player1'));

        document.querySelector(DOM.player2_increaseHealth).addEventListener('click', () => increaseHealth('player2'));
        document.querySelector(DOM.player2_decreaseHealth).addEventListener('click', () => decreaseHealth('player2'));

    };

    const increaseHealth = player => {
        healthCtrl.increasePlayerHealth(player);
        const currentHealth = healthCtrl.getPlayerHealth(player);
        UICtrl.setValue(currentHealth, player);
    };

    const decreaseHealth = player => {
        healthCtrl.decreasePlayerHealth(player);
        const currentHealth = healthCtrl.getPlayerHealth(player);
        UICtrl.setValue(currentHealth, player);
    };

    return {
        init: () => {
            console.log('Application has started!');
            setupEventListeners();
        }
    };
})(UIController, healthController);

controller.init();
