import ShoppingCart from '../scripts/shoppingCart/ShoppingCart';
import { updateable } from '../scripts/custom-stores/updateableStore';

export const currentCartItems = updateable( (set) => {
    set(new ShoppingCart().getLengthcartItems());
});
