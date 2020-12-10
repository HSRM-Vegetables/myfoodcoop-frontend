import Api from './api/Api';

export default class Balance {
    async getBalance() {
        const data = await Api.get('balance');
        this.currentBalance = data.balance;
        return data.balance;
    }

    async setBalance(money) {
        if (money !== null && money !== 'NaN' && money !== '' && money !== undefined) {
            let balance = money.replace(',', '.');
            balance = parseFloat(balance);
            balance = balance.toFixed(2);
            this.currentBalance = balance;

            await Api.post('balance', JSON.stringify({
                balance: money
            }));
        }
    }

    async adjustBalance(money) {
        if (money !== null && money !== 'NaN' && money !== '' && money !== undefined) {
            let balance = money;
            if (typeof money === 'string') {
                balance = money.replace(',', '.');
                balance = parseFloat(balance);
            }

            balance = balance.toFixed(2);
            this.currentBalance = parseFloat(this.currentBalance) + parseFloat(balance);

            await Api.post('balance', JSON.stringify({
                balanceDifference: balance
            }));
        }
    }

    calcBalance(money, operation = '+') {
        switch (operation) {
        case '+':
            // return sum of new money and old money
            return (parseFloat(this.currentBalance) + parseFloat(money)).toFixed(2);
        case '-':
            // return dif of old money and new money
            return (parseFloat(this.currentBalance) - parseFloat(money)).toFixed(2);
        default:
            return null;
        }
    }
}
