<script>
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';
    import { mdiMagnify } from '@mdi/js'
    import Icon from '../common/Icon.svelte';

    const purchaseApi = new PurchaseApi();

    function calculatePrice(purchase) {
        let price = 0;
        purchase.products.forEach((product) => {
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
                    <a href="/history/{purchase.id}" class="button is-small is-primary">
                        <span class="icon">
                            <Icon icon={mdiMagnify}/>
                        </span>
                        <span>Details</span>
                    </a>
                </td>
            </tr>
        {/each}
    </tbody>
</table>