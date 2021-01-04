import { get } from 'svelte/store';
import Fetch from './api/Fetch';
import { name } from '../stores/user';
import CustomError, { ErrorCodes } from './api/CustomError';

export default class Balance {
    /**
     * Requests the current balance from the API
     * @returns {number} current balance
     */
    static async getBalance() {
        const response = await Fetch.get(`balance/${get(name)}`);
        return response.balance;
    }

    /**
     * Request to the API to set the balance to the specified value
     * @param {number} newBalance value the balance should be set to
     * @returns {number} current balance
     */
    static async setBalance(newBalance) {
        if (!newBalance || Number.isNaN(newBalance) || typeof newBalance !== 'number') {
            throw new CustomError(ErrorCodes.BALANCE_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.patch(`balance/${get(name)}`, {
            balance: newBalance
        });

        return response.balance;
    }

    /**
     * Request to the API to topup the balance with the specified value
     * @param {number} topupAmount value to add on top of balance
     * @returns {number} current balance
     */
    static async topupBalance(topupAmount) {
        if (!topupAmount || Number.isNaN(topupAmount) || typeof topupAmount !== 'number') {
            throw new CustomError(ErrorCodes.TOPUP_AMOUNT_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.post(`balance/${get(name)}/topup`, {
            amount: topupAmount
        });

        return response.balance;
    }

    /**
     * Request to the API to withdraw the balance with the specified value
     * @param {number} withDrawAmount value to subtract from the balance
     * @returns {number} current balance
     */
    static async withdrawBalance(withDrawAmount) {
        if (!withDrawAmount || Number.isNaN(withDrawAmount) || typeof withDrawAmount !== 'number') {
            throw new CustomError(ErrorCodes.WITHDRAW_AMOUNT_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.post(`balance/${get(name)}/withdraw`, {
            amount: withDrawAmount
        });

        return response.balance;
    }
}
