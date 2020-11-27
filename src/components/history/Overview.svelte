<script>
    import PurchaseApi from '../../scripts/PurchaseApi';

    const purchaseApi = new PurchaseApi();

    function calculatePrice(purchase) {
        let price = 0;
        purchase.products.forEach(product => {
            price += product.pricePerUnit * product.quantity;
        });
        return price;
    }
</script>

<table class="table is-fullwidth is-hoverable">
    <thead>
        <tr>
            <td>Datum</td>
            <td>Anzahl</td>
            <td>Preis</td>
            <td>Details</td>
        </tr>
    </thead>
    <tbody>
        {#each purchaseApi.purchases as purchase}
            <tr>
                <td>{purchase.purchasedAt.toLocaleString()}</td>
                <td>{purchase.products.length}</td>
                <td>{calculatePrice(purchase).toFixed(2)}€</td>
                <td>
                    <a href="/history/{purchase.id}" class="button is-primary is-small">🔍</a>
                </td>
            </tr>
        {/each}
    </tbody>
</table>