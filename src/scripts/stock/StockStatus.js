/**
 * Enum of all stock statuses
 */
export const StockStatus = {
    ORDERED: 'ORDERED',
    INSTOCK: 'INSTOCK',
    PERISHESSOON: 'PERISHESSOON',
    OUTOFSTOCK: 'OUTOFSTOCK',
}

/**
 * Export all statuses with an appropriate german description
 */
export const StockStatusWithDescription = [
    {
        identifier: StockStatus.ORDERED,
        descripton: 'Bestellt'
    },
    {
        identifier: StockStatus.INSTOCK,
        descripton: 'Im Lager'
    },
    {
        identifier: StockStatus.PERISHESSOON,
        descripton: 'verfällt bald'
    },
    {
        identifier: StockStatus.OUTOFSTOCK,
        descripton: 'nicht mehr im Lager'
    },
]

/**
 * Localizes a stock status identifier based on the descriptions above
 * @param {StockStatus} status stock status of an item
 */
export const getLocalizedStockStatus = (status) => 
    StockStatusWithDescription.find(s => s.identifier === status).descripton;