export default class SoldItems {

    static async getBalance() {
        // const response = await Fetch.get('/reports/sold-items');
        const resonse = {
            "items": [
                {
                    "id": "0794e2e2-f5b2-42fb-a2b3-e12c75897f85",
                    "name": "Kartoffeln",
                    "fromDate": "2017-07-21",
                    "toDate": "2017-07-21",
                    "quantitySold": 40.2,
                    "unitType": "PIECE"
                }
            ]
        }

        return resonse.items;
    }
}