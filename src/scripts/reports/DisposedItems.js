import Fetch, { getAuthorizationHeader } from "../api/Fetch";

export default class DisposedItems {

    static async getItems(fromDate, toDate) {
        const response = await Fetch.get(
            `reports/disposed-items?fromDate=${ fromDate }&toDate=${ toDate}`,
            getAuthorizationHeader()
        );
        return response;
    }
}