import { get } from 'svelte/store';
import Fetch from './api/Fetch';
import { name } from '../stores/user';
import CustomError, { ErrorCodes } from './api/CustomError';

export default class Balance {
    /**
     * Requests the current balance from the API
     * @returns {number} current balance
     */
    async getBalance() {
        const response = await Fetch.get(`balance/${get(name)}`);
        this.currentBalance = response.balance;
        return this.currentBalance;
    }

    /**
     * Request to the API to set the balance to the specified value
     * @param {number} newBalance value the balance should be set to
     * @returns {number} current balance
     */
    async setBalance(newBalance) {
        if (!newBalance || Number.isNaN(newBalance) || typeof newBalance !== 'number') {
            throw new CustomError(ErrorCodes.BALANCE_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.patch(`balance/${get(name)}`, JSON.stringify({
            balance: newBalance
        }));
        this.currentBalance = response.balance;

        return this.currentBalance;
    }

    /**
     * Request to the API to topup the balance with the specified value
     * @param {number} topupAmount value to add on top of balance
     * @returns {number} current balance
     */
    async topupBalance(topupAmount) {
        if (!topupAmount || Number.isNaN(topupAmount) || typeof topupAmount !== 'number') {
            throw new CustomError(ErrorCodes.TOPUP_AMOUNT_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.post(`balance/${get(name)}/topup`, JSON.stringify({
            amount: topupAmount
        }));
        this.currentBalance = response.balance;

        return this.currentBalance;
    }

    /**
     * Request to the API to withdraw the balance with the specified value
     * @param {number} withDrawAmount value to subtract from the balance
     * @returns {number} current balance
     */
    async withdrawBalance(withDrawAmount) {
        if (!withDrawAmount || Number.isNaN(withDrawAmount) || typeof withDrawAmount !== 'number') {
            throw new CustomError(ErrorCodes.WITHDRAW_AMOUNT_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.post(`balance/${get(name)}/withdraw`, JSON.stringify({
            amount: withDrawAmount
        }));
        this.currentBalance = response.balance;

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
