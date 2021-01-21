import ShoppingCart from '../scripts/shoppingCart/ShoppingCart';
import { updateable } from '../scripts/custom-stores/updateableStore';

export const cartItemsCount = updateable( (set) => {
    set(new ShoppingCart().getCartItemsCount());
});
