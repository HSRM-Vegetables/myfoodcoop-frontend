import Fetch, { getAuthorizationHeader } from "../api/Fetch";

export default class SoldItems {

    static async getItems(fromDate, toDate) {
        const response = await Fetch.get(
            `reports/sold-items?fromDate=${ fromDate }&toDate=${ toDate}`,
            getAuthorizationHeader()
        );
        return response;
    }
}