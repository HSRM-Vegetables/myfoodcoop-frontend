import LocalStorageKeys from '../LocalStorageKeys';
import ShoppingCartItem from './StockItem';
import { UnitType } from '../UnitType';

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

    // TODO: Implement updates of cartitems
    addItem(name, unitType, unitPrice, quantity) {
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

        // check if item name already exists in item array. if true, remove the entry
        if (this.cartItems.find((item) => item.name === name) !== undefined) {
            // remove item from list;
            this.cartItems = this.cartItems.filter((ci) => ci.name !== name);
        }

        this.cartItems = [...this.cartItems,
            new ShoppingCartItem(name, unitType, unitPriceSanitized, quantity)];

        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));

        return true;
    }

    removeItem(name) {
        this.cartItems = this.cartItems.filter((item) => item.name !== name);
        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));
    }

    totalPrice() {
        let totalPrice = 0.0;
        this.cartItems.forEach((item) => {
            totalPrice += (item.unitPrice * item.quantity);
        });

        return totalPrice.toFixed(2);
    }

    clear() {
        this.cartItems = [];
        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));
    }
}
