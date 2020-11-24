import LocalStorageKeys from '../scripts/LocalStorageKeys';

export default class Balance {
    constructor() {
        const temp = window.localStorage.getItem(LocalStorageKeys.BALANCE);
        if (temp === null || temp === 'NaN') {
            this.currentBalance = 0.00;
            window.localStorage.setItem(LocalStorageKeys.BALANCE, this.currentBalance);
        } else {
            this.currentBalance = parseFloat(temp).toFixed(2);
        }
    }

    get money() {
        return this.currentBalance;
    }

    setBalance(money) {
        let balance = money.replace(',', '.');
        balance = parseFloat(balance);
        balance = balance.toFixed(2);

        this.currentBalance = balance;
        window.localStorage.setItem(LocalStorageKeys.BALANCE, balance);
    }

    calcBalance(money, operation = '+') {
        switch (operation) {
        case '+':
            // return sum of new money and old money
            return (parseFloat(this.money) + parseFloat(money)).toFixed(2);
        case '-':
            // return dif of old money and new money
            return parseFloat(this.money) - parseFloat(money);
        default:
            return null;
        }
    }
}
