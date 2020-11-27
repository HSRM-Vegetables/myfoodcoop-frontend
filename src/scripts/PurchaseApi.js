export default class PurchaseApi {
    constructor() {
        this.currentPurchases = [
            {
                id: '123sadf',
                purchasedAt: new Date(),
                products: [
                    {
                        name: 'Kürbis',
                        unit: 'kg',
                        pricePerUnit: 0.6,
                        quantity: 10
                    }
                ]
            },
            {
                id: '567sadf',
                purchasedAt: new Date(),
                products: [
                    {
                        name: 'Brot',
                        unit: 'stück',
                        pricePerUnit: 2.6,
                        quantity: 1
                    }
                ]
            }
        ];
    }

    get purchases() {
        return this.currentPurchases;
    }
}
