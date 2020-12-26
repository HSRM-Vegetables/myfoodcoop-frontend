import { UnitType } from '../UnitType';
import StockItem from './StockItem';
import LocalStorageKeys from '../LocalStorageKeys';
import { moneyStyler } from '../Helper';

export default class Stock {
    constructor() {
        const stockString = window.localStorage.getItem(LocalStorageKeys.STOCK);
        if (stockString !== null) {
            try {
                this.stockItems = JSON.parse(stockString);
            } catch (e) {
                this.stockItems = [];
            }
        } else {
            this.stockItems = [];
        }
    }

    /**
     * Saves the current stock list to the localStorage
     */
    writeToLocalStorage() {
        localStorage.setItem(LocalStorageKeys.STOCK, JSON.stringify(this.stockItems));
    }

    /**
     * Adds an item to the current stock
     * @param {String} id The id of the item
     * @param {String} name The name of the item
     * @param {UnitType} unitType kg / piece. See src/scripts/UnitType.js
     * @param {String} unitPrice The price of the item as a string.
     * Decimals can be denoted by a comma or a point.
     * Will be cast to a float
     * @param {String} quantity How many pieces of this item are available.
     * Will be parsed to an integer
     * @param {String} description Additional information for this item
     * @returns {Boolean} true if item was added, false if it wasn't added
     * (due to errors while parsing etc)
     */
    addItem(id, name, unitType, unitPrice, quantity, description) {
        if (unitType !== UnitType.KILO && unitType !== UnitType.PIECE) {
            return false;
        }

        const unitPriceSanitized = moneyStyler(unitPrice);
        if (Number.isNaN(unitPriceSanitized)) {
            return false;
        }

        const quantityParsed = parseInt(quantity, 10);
        if (Number.isNaN(quantityParsed)) {
            return false;
        }

        this.stockItems = [...this.stockItems,
            new StockItem(id, name, unitType, unitPriceSanitized, quantity, description)
        ];

        this.writeToLocalStorage();

        return true;
    }

    /**
     * Removes an item by item from the stock list
     * @param {string} id uuid of the item
     */
    removeItem(id) {
        this.stockItems = this.stockItems.filter((item) => item.id !== id);
        this.writeToLocalStorage();
    }

    /**
     * Returns an StockItem Object from the current stock, identified by the name
     * @param {String} id The uid of the item
     * @returns {(StockItem|undefined)} StockItem Object or undefined if no item found
     */
    getItem(id) {
        return this.stockItems.find((element) => element.id === id);
    }

    /**
     * Remove the specified quantity from stock
     * @param {string} name The name of the item
     * @param {number} quantity quantity to be remove from the item
     */
    removeQuantityFromItem(id, quantity) {
        // get the specified item
        const stockItem = this.getItem(id);

        // reduce its quantity
        stockItem.quantity -= quantity;

        // remove the item from the list
        this.stockItems = this.stockItems.filter((item) => item.id !== id);

        // re-add the item to the list
        this.stockItems = [...this.stockItems, stockItem];

        // save the items
        this.writeToLocalStorage();
    }

    /**
     * Updates the item by removing it and recreating it with the same id
     * @param {String} id The id of the item
     * @param {String} name The name of the item
     * @param {UnitType} unitType kg / piece. See src/scripts/UnitType.js
     * @param {String} unitPrice The price of the item as a string.
     * Decimals can be denoted by a comma or a point.
     * Will be cast to a float
     * @param {String} quantity How many pieces of this item are available.
     * Will be parsed to an integer
     * @param {String} description Additional information for this item
     * @returns {Boolean} true if item was added, false if it wasn't added
     * (due to errors while parsing etc)
     */
    updateItem(id, name, unitType, unitPrice, quantity, description) {
        this.removeItem(id);
        return this.addItem(id, name, unitType, unitPrice, quantity, description)
    }
}
