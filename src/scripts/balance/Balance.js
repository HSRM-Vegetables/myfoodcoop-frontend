import Fetch, { getAuthorizationHeader } from '../api/Fetch';
import CustomError, { ErrorCodes } from '../api/CustomError';

export default class Balance {

    /**
     * Requests the current balance for another user from the API
     * @param {string} userId the ID of the desired user
     * @returns {number} current balance
     */
    static async getBalanceForUser(userId) {
        const response = await Fetch.get(`balance/${userId}`, getAuthorizationHeader());
        return response.balance;
    }

    /**
     * Request to the API to set the balance to the specified value
     * @param {number} newBalance value the balance should be set to
     * @returns {number} current balance
     */
    static async setBalanceForUser(userId, newBalance) {
        if (!newBalance || Number.isNaN(newBalance) || typeof newBalance !== 'number') {
            throw new CustomError(ErrorCodes.BALANCE_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.patch(`balance/${userId}`, {
            balance: newBalance
        }, getAuthorizationHeader());

        return response.balance;
    }

    /**
     * Request to the API to topup the balance with the specified value
     * @param {number} topupAmount value to add on top of balance
     * @returns {number} current balance
     */
    static async topupBalanceForUser(userId, topupAmount) {
        if (!topupAmount || Number.isNaN(topupAmount) || typeof topupAmount !== 'number') {
            throw new CustomError(ErrorCodes.TOPUP_AMOUNT_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.post(`balance/${userId}/topup`, {
            amount: topupAmount
        }, getAuthorizationHeader());

        return response.balance;
    }

    /**
     * Request to the API to withdraw the balance with the specified value
     * @param {number} withDrawAmount value to subtract from the balance
     * @returns {number} current balance
     */
    static async withdrawBalanceForUser(userId, withDrawAmount) {
        if (!withDrawAmount || Number.isNaN(withDrawAmount) || typeof withDrawAmount !== 'number') {
            throw new CustomError(ErrorCodes.WITHDRAW_AMOUNT_NOT_A_NUMBER, 'Value needs to be a number');
        }

        const response = await Fetch.post(`balance/${userId}/withdraw`, {
            amount: withDrawAmount
        }, getAuthorizationHeader());

        return response.balance;
    }

    /**
     * Gets the balance history of the user
     * @param {string} userId unique id of the user
     * @param {string} fromDate start date in the format yyyy-MM-dd
     * @param {string} toDate end date in the format yyyy-MM-dd
     * @param {number} pageNumber page number for pagination
     * @param {number} pageSize number of elements per page
    */
    static async getHistory(userId, fromDate, toDate, pageNumber, pageSize) {
        const url = `balance/${userId}/history`;
        const params = `fromDate=${fromDate}&toDate=${toDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`

        return Fetch.get(`${url}?${params}`, getAuthorizationHeader());
    }
}
