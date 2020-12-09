import { UnitType } from '../UnitType';
import StockItem from './StockItem';
import LocalStorageKeys from '../LocalStorageKeys';

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

    addItem(name, unitType, unitPrice, quantity, description) {
        if (unitType !== UnitType.KILO && unitType !== UnitType.PIECE) {
            return false;
        }

        let unitPriceSanitized = unitPrice.replace(',', '.');
        unitPriceSanitized = parseFloat(unitPriceSanitized);
        if (Number.isNaN(unitPriceSanitized)) {
            return false;
        }
        unitPriceSanitized = unitPriceSanitized.toFixed(2);

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
