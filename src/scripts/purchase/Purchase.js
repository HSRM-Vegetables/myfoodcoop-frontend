import Fetch, { getAuthorizationHeader } from "../api/Fetch";

export default class Purchase {

    /**
     * Request to the API to get all previous purchases done by the logged in user
     * @returns {object} purchase-list-response: an array with purchase-history-items with id (uuid of the purchase),
     *                   createdOn (Date and time the purchase was created at), totalPrice
     *                   and items (array of purchase-item)
     * 
     * @param {number} offset offset for pagination if pagination required
     * @param {number} limit number of items per page for pagination
     */
    static async getPurchaseList(offset, limit) {
        return Fetch.get(`purchase?offset=${offset}&limit=${limit}`, getAuthorizationHeader());
    }

    /**
     * Request to the API to get a specified purchase done by the logged in user
     * @param {string} id uuid of the desired purchase
     * @return {object} purchase-history-item with id (uuid of the purchase), 
     *                  createdOn (Date and time the purchase was created at), totalPrice
     *                  and items (array of purchase-item)
     */
    static async getPurchase(id) {
        return Fetch.get(`purchase/${id}`, getAuthorizationHeader());
    }

    /**
     * Request to the API to add a purchase
     * @param {array} cartItems Array of ShoppingCartItem Objects belonging to the purchase
     * @returns {object} purchase-response with name (username), id (uuid of the purchase), 
     *                   balance (new balance of the the user after the puchase) and price (cart costs)
     */
    static async addPurchase(cartItems) {
        const body = {
            "items": cartItems.map( item => (
                {
                    "id": item.stockItem.id,
                    "amount": item.quantity
                }
            ))
        };

        return Fetch.post('purchase', body, getAuthorizationHeader());
    }
    
}
