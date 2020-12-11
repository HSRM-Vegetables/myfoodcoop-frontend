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
     * Adds an item to the current stock
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
    addItem(name, unitType, unitPrice, quantity, description) {
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
            new StockItem(name, unitType, unitPriceSanitized, quantity, description)
        ];

        localStorage.setItem(LocalStorageKeys.STOCK, JSON.stringify(this.stockItems));

        return true;
    }
}
