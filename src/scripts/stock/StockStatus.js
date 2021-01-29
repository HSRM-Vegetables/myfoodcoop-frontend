export const StockStatus = {
    ORDERED: 'ORDERED',
    INSTOCK: 'INSTOCK',
    PERISHESSOON: 'PERISHESSOON',
    OUTOFSTOCK: 'OUTOFSTOCK',
}

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