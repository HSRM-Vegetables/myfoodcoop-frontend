export default class Purchase {
    constructor(id, createdOn, cartItems) {
        this.id = id;
        this.createdOn = createdOn;
        this.cartItems = cartItems;
    }

    totalPrice() {
        return this.cartItems.reduce((sum, ci) => sum + ci.stockItem.unitPrice * ci.quantity, 0);
    }
}
