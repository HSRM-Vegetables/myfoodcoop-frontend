import LocalStorageKeys from '../LocalStorageKeys';
import Purchase from './Purchase';

export default class PurchaseApi {
    constructor() {
        this.purchases = [];
        const storedPurchases = window.localStorage.getItem(LocalStorageKeys.PURCHASES);
        if (storedPurchases !== undefined && storedPurchases !== '') {
            const purchasesObject = JSON.parse(storedPurchases);
            if (purchasesObject !== undefined && purchasesObject !== null) {
                this.purchases = purchasesObject.map((p) => new Purchase(
                    p.id,
                    new Date(p.createdOn),
                    p.cartItems
                ));
            }
        }
    }

    addPurchase(purchase) {
        this.purchases.push(purchase);
        window.localStorage.setItem(LocalStorageKeys.PURCHASES, JSON.stringify(this.purchases));
    }
}
