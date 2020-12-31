import { get } from 'svelte/store';
import LocalStorageKeys from '../LocalStorageKeys';
import Purchase from './Purchase';
import Fetch from "../api/Fetch";
import { name } from '../../stores/user';

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

    static async addPurchase(cartItems) {
        const additionalHeader = {'X-Username': get(name)};
        const body = {
            "items": cartItems.map( item => (
                {
                    "id": item.stockItem.id,
                    "amount": item.quantity
                }
            ))
        };

        return Fetch.post('purchase', JSON.stringify(body), additionalHeader);
    }
}
