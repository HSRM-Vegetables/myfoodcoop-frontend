import { writable } from 'svelte/store'
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

    // update the perishes soon stock item after the stock has updated
    perishesSoonStockItems.forceUpdate();
})
export const areStockItemsUpdating = writable(false);

export const perishesSoonStockItems = updateable(async (set) => {
    // indicate that the stock items are updating
    arePerishesSoonStockItemsUpdating.set(true);

    // update the stock items
    const stockList = await Stock.getStockListByStatus(StockStatus.PERISHESSOON);
    const stockListItems = stockList ? stockList.items : undefined;
    set(stockListItems);

    // indicate that the stock items have finished updating 
    arePerishesSoonStockItemsUpdating.set(false);
})
export const arePerishesSoonStockItemsUpdating = writable(false);