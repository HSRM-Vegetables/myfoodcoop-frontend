import { get } from 'svelte/store';
import Api from './api/Api';
import { name } from '../stores/user';

export default class Balance {
    /**
     * Requests the current balance from the API
     * @returns {number} current balance
     */
    async getBalance() {
        const response = await Api.get(`balance/${get(name)}`);
        this.currentBalance = response.balance;
        return this.currentBalance;
    }

    /**
     * Request to the API to set the balance to the specified value
     * @param {number} newBalance value the balance should be set to
     * @returns {number} current balance
     */
    async setBalance(newBalance) {
        if (newBalance !== null && newBalance !== 'NaN' && newBalance !== '' && newBalance !== undefined) {
            const response = await Api.patch(`balance/${get(name)}`, JSON.stringify({
                balance: newBalance
            }));
            this.currentBalance = response.balance;
        }
        return this.currentBalance;
    }

    /**
     * Request to the API to topup the balance with the specified value
     * @param {*} topupAmount value to add on top of balance
     * @returns {number} current balance
     */
    async topupBalance(topupAmount) {
        if (topupAmount !== null && topupAmount !== 'NaN' && topupAmount !== '' && topupAmount !== undefined) {
            const response = await Api.post(`balance/${get(name)}/topup`, JSON.stringify({
                amount: topupAmount
            }));
            this.currentBalance = response.balance;
        }
        return this.currentBalance;
    }

    /**
     * Request to the API to withdraw the balance with the specified value
     * @param {number} withDrawAmount value to subtract from the balance
     * @returns {number} current balance
     */
    async withdrawBalance(withDrawAmount) {
        if (withDrawAmount !== null && withDrawAmount !== 'NaN' && withDrawAmount !== '' && withDrawAmount !== undefined) {
            const response = await Api.post(`balance/${get(name)}/withdraw`, JSON.stringify({
                amount: withDrawAmount
            }));
            this.currentBalance = response.balance;
        }
        return this.currentBalance;
    }

    /**
     * Calculates a value based on the current balance and the specified values.
     * IMPORTANT: Does not change the remote balance
     * @param {number} amount the amount to be applied to the current balance
     * @param {string} operation the operation the amount should be applied to the current balance
     */
    calcBalance(amount, operation = '+') {
        switch (operation) {
        case '+':
            // return sum of new money and old money
            return (parseFloat(this.currentBalance) + parseFloat(amount)).toFixed(2);
        case '-':
            // return dif of old money and new money
            return (parseFloat(this.currentBalance) - parseFloat(amount)).toFixed(2);
        default:
            return null;
        }
    }
}
