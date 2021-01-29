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
