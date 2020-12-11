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
