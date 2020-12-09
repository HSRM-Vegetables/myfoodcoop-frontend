<script>
    import { UnitType } from '../../scripts/UnitType';

    export let cartItems;
</script>
<table class="table is-fullwidth is-hoverable">
    <thead>
        <tr>
            <th>Artikel</th>
            <th>Menge</th>
            <th>Preis</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each cartItems as item}
        <tr>
            <td>
                <span class="item-name">{item.name}</span><br>
            </td>
            <td>
                {#if item.unitType === UnitType.PIECE }
                <span>{item.quantity} Stück</span> 
                {:else}
                <span>{item.quantity} kg</span>
                {/if}
            </td>
            <td>
                {#if item.unitType === UnitType.PIECE }
                <span>{item.unitPrice} € / Stück</span> 
                {:else}
                <span>{item.unitPrice} € / kg</span>
                {/if}
            </td>
        </tr> 
        {/each}
    </tbody>
</table>

