import { derived, writable } from 'svelte/store'
import { updateable } from '../scripts/custom-stores/updateableStore'
import Stock from '../scripts/stock/Stock'
import { StockStatus } from '../scripts/stock/StockStatus';

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

// update the items below as soon as the stockItems change
export const spoilsSoonItems = derived(
    stockItems,
    $stockItems => $stockItems && $stockItems.filter(si => si.stockStatus === StockStatus.SPOILSSOON)
);

export const orderedItems = derived(
    stockItems,
    $stockItems => $stockItems && $stockItems.filter(si => si.stockStatus === StockStatus.ORDERED)
);

export const inStockItems = derived(
    stockItems,
    $stockItems => $stockItems && $stockItems.filter(si => si.stockStatus === StockStatus.INSTOCK)
);

export const outOfStockItems = derived(
    stockItems,
    $stockItems => $stockItems && $stockItems.filter(si => si.stockStatus === StockStatus.OUTOFSTOCK)
);