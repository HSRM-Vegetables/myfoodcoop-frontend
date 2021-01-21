import LocalStorageKeys from '../LocalStorageKeys';
import ShoppingCartItem from './ShoppingCartItem';

export default class ShoppingCart {
    constructor() {
        const cartString = window.localStorage.getItem(LocalStorageKeys.CART);
        if (cartString !== null) {
            try {
                this.cartItems = JSON.parse(cartString);
            } catch (e) {
                this.cartItems = [];
            }
        } else {
            this.cartItems = [];
        }
    }

    // TODO: Implement updates of cartitems
    addItem(stockItem, quantity) {
        const quantityParsed = parseInt(quantity, 10);
        if (Number.isNaN(quantityParsed)) {
            return false;
        }

        // check if item name already exists in item array. if true, remove the entry
        if (this.cartItems.find((item) => item.stockItem.id === stockItem.id) !== undefined) {
            // remove item from list;
            this.cartItems = this.cartItems.filter((ci) => ci.stockItem.id !== stockItem.id);
        }

        this.cartItems = [...this.cartItems,
            new ShoppingCartItem(stockItem, quantity)];

        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));

        return true;
    }

    removeItem(id) {
        this.cartItems = this.cartItems.filter((item) => item.stockItem.id !== id);
        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));
    }

    getCartItemsCount() {
        return this.cartItems.length;
    }
    
    totalPrice() {
        let totalPrice = 0.0;
        this.cartItems.forEach((item) => {
            totalPrice += (item.stockItem.pricePerUnit * item.quantity);
        });

        return totalPrice.toFixed(2);
    }

    clear() {
        this.cartItems = [];
        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));
    }
}
