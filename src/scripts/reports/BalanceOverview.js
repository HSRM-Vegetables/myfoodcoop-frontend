import Fetch, { getAuthorizationHeader } from "../api/Fetch";

export default class BalanceOverview {

    /**
     * Get balance overview report
     * @param {string} deleted Controls if deleted users will be inlcuded in the resulsts.
     *                         Possible Values:
                                OMIT: Only users which haven't been deleted will be included
                                INCLUDE: Delted and not deleted users will be returned
                                ONLY: Only return deleted users
     */
    static async getBalanceList(deleted) {
        const response = await Fetch.get(
            `reports/balance-overview?deleted=${deleted}`,
            getAuthorizationHeader()
        );
        return response.users;
    }
}