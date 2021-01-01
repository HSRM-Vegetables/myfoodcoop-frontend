import { writable } from 'svelte/store'
import { updateable } from '../scripts/custom-stores/updateableStore'
import Stock from '../scripts/stock/Stock'

export const stockItems = updateable(async (set) => {
    areStockItemsUpdating.set(true);
    const stockList = await Stock.getStockList();
    const stockListItems = stockList ? stockList.items : undefined;
    set(stockListItems);
    areStockItemsUpdating.set(false);
})

export const areStockItemsUpdating = writable(false);