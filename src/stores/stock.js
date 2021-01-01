import { updateable } from '../scripts/custom-stores/updateableStore'
import Stock from '../scripts/stock/Stock'

export const stockItems = updateable(async (set) => {
    const stockList = await Stock.getStockList();
    const stockListItems = stockList ? stockList.items : undefined;
    set(stockListItems);
})