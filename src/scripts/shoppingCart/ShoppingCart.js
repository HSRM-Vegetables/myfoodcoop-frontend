import LocalStorageKeys from '../common/LocalStorageKeys';
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
        
        // check if item name already exists in item array. if true, remove the entry and save old quantity
        const isOld = this.cartItems.find((item) => item.stockItem.id === stockItem.id);
        let oldQuantity = 0;
        if (isOld !== undefined) {
            // remove item from list;
            oldQuantity = isOld.quantity;
            this.cartItems = this.cartItems.filter((ci) => ci.stockItem.id !== stockItem.id);
        }

        this.cartItems = [...this.cartItems,
            new ShoppingCartItem(stockItem, parseFloat(quantity)+ parseFloat(oldQuantity))];

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
            totalPrice += item.stockItem.pricePerUnit ? (item.stockItem.pricePerUnit * item.quantity) : 0;
        });

        return totalPrice.toFixed(2);
    }

    clear() {
        this.cartItems = [];
        localStorage.setItem(LocalStorageKeys.CART, JSON.stringify(this.cartItems));
    }
}
