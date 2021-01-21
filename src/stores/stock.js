import { writable } from 'svelte/store'
import { updateable } from '../scripts/custom-stores/updateableStore'
import Stock from '../scripts/stock/Stock'

export const stockItems = updateable(async (set) => {
    // indicate that the stock items are updating
    areStockItemsUpdating.set(true);

    // update the stock items
    const stockList = await Stock.getStockList();
    const stockListItems = stockList ? stockList.items : undefined;
    set(stockListItems);

    // indicate that the stock items have finished updating 
    areStockItemsUpdating.set(false);
})

export const areStockItemsUpdating = writable(false);
