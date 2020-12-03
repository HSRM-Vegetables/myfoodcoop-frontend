  
<script context="module" >
    let id = -1;

    export async function preload({ params }) {
        id = params.purchaseId;
    }
</script>

<script>
    import PurchaseApi from '../../scripts/purchase/PurchaseApi';

    const purchaseApi = new PurchaseApi();

    const purchase = purchaseApi.purchases.find((p) => p.id === id);
</script>

<!-- We want to display the cart here, we will need to wait until its in master -->
<!-- Use this placeholder in the meantime -->
{JSON.stringify(purchase)}