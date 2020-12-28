import { moneyStyler } from '../Helper';
import Fetch from "../api/Fetch";

export default class Stock {

    static async getStockList() {
        return Fetch.get(`stock/`);
    }

    /**
     * Adds an item to the current stock
     * @param {String} name The name of the item
     * @param {UnitType} unitType kg / piece. See src/scripts/UnitType.js
     * @param {String} pricePerUnit The price of the item as a string.
     * Decimals can be denoted by a comma or a point.
     * Will be cast to a float
     * @param {String} quantity How many pieces of this item are available.
     * Will be parsed to an integer
     * @param {String} description Additional information for this item
     * @returns {Boolean} true if item was added, false if it wasn't added
     * (due to errors while parsing etc)
     */
    static async addItem(name, unitType, pricePerUnit, quantity, description) {
        return Fetch.post(`stock/`, JSON.stringify({
            'name': name,
            'unitType': unitType,
            'pricePerUnit': moneyStyler(pricePerUnit),
            'quantity': moneyStyler(quantity),
            'description': description
        }));
    }

    /**
     * Removes an item by item from the stock list
     * @param {string} id uuid of the item
     */
    static async removeItem(id) {
        return Fetch.delete(`stock/${id}`);
    }

    /**
     * Returns an StockItem Object from the current stock, identified by the name
     * @param {String} id The uid of the item
     * @returns {(StockItem|undefined)} StockItem Object or undefined if no item found
     */
    static async getItem(id) {
        return Fetch.get(`stock/${id}`);
    }

    /**
     * Remove the specified quantity from stock
     * @param {string} name The name of the item
     * @param {number} quantity quantity to be remove from the item
     */
    static async removeQuantityFromItem(id, quantity) {
        const getItem = await Fetch.get(`stock/${id}`);
        const newQuantity = getItem.quantity - quantity;
        return Fetch.patch(`stock/${id}`, JSON.stringify({
            quantity: newQuantity
        }));
    }

    /**
     * Updates the item by removing it and recreating it with the same id
     * @param {String} id The id of the item
     * @param {String} name The name of the item
     * @param {UnitType} unitType kg / piece. See src/scripts/UnitType.js
     * @param {String} pricePerUnit The price of the item as a string.
     * Decimals can be denoted by a comma or a point.
     * Will be cast to a float
     * @param {String} quantity How many pieces of this item are available.
     * Will be parsed to an integer
     * @param {String} description Additional information for this item
     * @returns {Boolean} true if item was added, false if it wasn't added
     * (due to errors while parsing etc)
     */
    static async updateItem(id, name, unitType, pricePerUnit, quantity, description) {
        return Fetch.patch(`stock/${id}`, JSON.stringify({
            'name': name,
            'unitType': unitType,
            'pricePerUnit': moneyStyler(pricePerUnit),
            'quantity': moneyStyler(quantity),
            'description': description
        }));
    }
}
