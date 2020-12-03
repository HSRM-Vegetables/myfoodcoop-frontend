import { stringify } from 'uuid';
import LocalStorageKeys from '../LocalStorageKeys';

export default class PurchaseApi {
    constructor() {
        this.purchases = [];
        const storedPurchases = window.localStorage.getItem(LocalStorageKeys.PURCHASES);
        if (storedPurchases !== undefined && storedPurchases !== '') {
            
        }
    }

    addPurchase(purchase) {
        this.purchases.push(purchase);
        window.localStorage.setItem(LocalStorageKeys.PURCHASES, JSON.stringify(this.purchases));
    }
}
