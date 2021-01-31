import Fetch, { getAuthorizationHeader } from "../api/Fetch";

export default class BalanceOverview {

    static async getBalanceList() {
        const response = await Fetch.get(
            `reports/balance-overview`,
            getAuthorizationHeader()
        );
        return response.users;
    }
}