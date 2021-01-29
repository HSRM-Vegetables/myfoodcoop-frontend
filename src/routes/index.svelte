<script>
    import { goto } from '@sapper/app';
    import {
        mdiAccount,
        mdiCartArrowDown,
        mdiShopping,
        mdiPiggyBank,
        mdiShoppingSearch,
        mdiFormatListText,
        mdiChartAreasplineVariant,
        mdiAccountGroup,
    } from '@mdi/js';
    import { title, navBalance } from '../stores/page';
    import StockList from '../components/stock/StockList.svelte';
    import { spoilsSoonItems, areStockItemsUpdating } from '../stores/stock';
    import AuthorizeByRoles, { Roles } from '../components/common/AuthorizeByRoles.svelte';
    import { getLocalizedStockStatus, StockStatus } from '../scripts/stock/StockStatus';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Stadtgemüse e.V.';
    $navBalance = 'show';

    const buttons = [
        {
            label: 'Einkaufen',
            icon: mdiCartArrowDown,
            href: '/shopping/stock',
            access: [Roles.MEMBER],
        },
        {
            label: 'Warenkorb',
            icon: mdiShopping,
            href: '/shopping/cart',
            access: [Roles.MEMBER],
        },
        {
            label: 'Guthaben verwalten',
            icon: mdiPiggyBank,
            href: '/balance',
            access: [Roles.MEMBER],
        },
        {
            label: 'Benutzerdaten',
            icon: mdiAccount,
            href: '/profile',
            access: [],
        },
        {
            label: 'Bestand',
            icon: mdiFormatListText,
            href: '/stock/',
            access: [Roles.MEMBER],
        },
        {
            label: 'Reports',
            icon: mdiChartAreasplineVariant,
            href: '/reports/',
            access: [Roles.MEMBER],
        },
        {
            label: 'Vorherige Einkäufe',
            icon: mdiShoppingSearch,
            href: '/history',
            access: [Roles.MEMBER],
        },
        {
            label: 'Benutzerverwaltung',
            icon: mdiAccountGroup,
            href: '/users',
            access: [Roles.TREASURER, Roles.ADMIN],
        },
    ];

    function itemSelected(event) {
        goto(`/shopping/stock/${event.detail.id}`);
    }

    function itemDetails(event) {
        goto(`/stock/item/${event.detail.id}?comesFrom=home`);
    }

    function onKeyPress(event, href) {
        if (event.code === 'Space' || event.code === 'Enter') {
            goto(href);
        }
    }
</script>

<style>
    .icon-box {
        display: flex;
        flex-flow: wrap;
    }
    .icon-button {
        font-size: 15px;
        color: white;
        background: #375a7f;
        padding: 7px 24px;
        border-radius: 6px;
        cursor: pointer;
        display: grid;
        place-items: center;
        margin: 20px;
        min-width: 200px;
    }
    .icon-button svg {
        height: 120px;
    }
    @media (max-width: 920px) {
        .icon-button {
            display: inline-flex;
            place-items: center;
            margin: 20px 0;
        }
        .icon-box div {
            width: 100%;
        }
    }
</style>

<AuthorizeByRoles allowedRoles={[Roles.MEMBER]} displayPermissionNotAllowed={false}>
    <h2 class="pt-4 is-size-5 has-text-weight-bold">{getLocalizedStockStatus(StockStatus.SPOILSSOON)}</h2>
    <div class="has-text-centered mb-6">
        <StockList
            stockItems={$spoilsSoonItems}
            isLoading={$areStockItemsUpdating}
            isClickable={true}
            allowDetails={true}
            on:details={itemDetails}
            on:select={itemSelected}
            showDescription={false}
        />
    </div>
</AuthorizeByRoles>

<hr />
<h2 class="is-size-5 has-text-weight-bold">Funktionen:</h2>

<div class="icon-box">
    {#each buttons as button}
        <AuthorizeByRoles allowedRoles={button.access} displayPermissionNotAllowed={false}>
            <div class="has-text-centered-desktop-only">
                <div
                    class="icon-button"
                    tabindex="0"
                    role="button"
                    aria-label={button.label}
                    on:keypress={(e) => onKeyPress(e, button.href)}
                    on:click={() => goto(button.href)}
                >
                    <svg viewbox="0 0 24 24">
                        <!-- Give the path the value currentColor, so it inherits the text-color of its parent -->
                        <path fill="currentColor" d={button.icon} />
                    </svg>
                    <span class="has-text-weight-bold">{button.label}</span>
                </div>
            </div>
        </AuthorizeByRoles>
    {/each}
</div>
