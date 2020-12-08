<script>
    import { mdiDelete } from '@mdi/js';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';
    import Icon from '../common/Icon.svelte';
    import { UnitType } from '../../scripts/UnitType';
    
    /**
     * An Array of ShoppingCartItems to be displayed
     */
    export let cartItems;

</script>

<table class="table is-fullwidth is-hoverable">
    <thead>
        <tr>
            <th>Artikel</th>
            <th>Menge</th>
            <th>Preis</th>
        </tr>
    </thead>
    <tbody>
        {#each cartItems as item}
            <tr>
                <td>
                    <span class="item-name">{item.name}</span><br>
                    {#if item.unitType === UnitType.PIECE }
                        <span class="is-size-7">{item.unitPrice} € / Stück</span> 
                    {:else}
                        <span class="is-size-7">{item.unitPrice} € / kg</span>
                    {/if}
                </td>
                <td>
                    {#if item.unitType === UnitType.PIECE }
                        <span>{item.inStock} Stück</span> 
                    {:else}
                        <span>{item.inStock} kg</span>
                    {/if}
                </td>
                <td>{item.unitPrice} €</td>
            </tr>
        {/each}
    </tbody>
</table>
