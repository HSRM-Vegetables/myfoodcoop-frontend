import { get } from 'svelte/store';
import Fetch from "../api/Fetch";
import { name } from '../../stores/user';

export default class Purchase {

    static async getPurchaseList() {
        return Fetch.get('purchase', {'X-Username': get(name)});
    }

    static async getPurchase(id) {
        return Fetch.get(`purchase/${id}`, {'X-Username': get(name)});
    }

    static async addPurchase(cartItems) {
        const body = {
            "items": cartItems.map( item => (
                {
                    "id": item.stockItem.id,
                    "amount": item.quantity
                }
            ))
        };

        return Fetch.post('purchase', JSON.stringify(body), {'X-Username': get(name)});
    }
    
}
