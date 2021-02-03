export default class StockItem {
    constructor(id, name, unitType, unitPrice, quantity, description, 
        sustainablyProduced, certificates, originCategory, producer, supplier, orderDate, deliveryDate) {
        this.id = id;
        this.name = name;
        this.unitType = unitType;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.description = description;
        this.sustainablyProduced = sustainablyProduced;
        this.certificates = certificates;
        this.originCategory = originCategory;
        this.producer = producer;
        this.supplier = supplier;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
    }
}

/**
 * Calculates the tax rate given an stock item
 * @param {StockItem} item stock item
 * @returns {number} tax rate for given stock item
 */
export const getTaxPriceFromItem = (item) => item.pricePerUnit / (1.0 + item.vat) * item.vat;
