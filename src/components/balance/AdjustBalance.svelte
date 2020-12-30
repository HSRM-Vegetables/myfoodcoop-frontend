<script>
    import { goto } from '@sapper/app';
    import TextField from '../common/TextField.svelte';
    import Balance from '../../scripts/Balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import ShowBalance from './ShowBalance.svelte';
    import { currentBalance } from '../../stores/balance';

    let changeMoneyInput;
    let balanceUpdateInProgress = false;
    let requestError;

    async function changeBalance() {
        balanceUpdateInProgress = true;

        try {
            // Instead of assigning the result to the store we could also call `currentBalance.forceUpdate()`.
            // But this is not necessary as the response of the api-call is returning the actual balance,
            // so we can just assign it to the store. This change will take immediate affect on all other components
            // that are using this store.

            // This variable is used in other files
            // eslint-disable-next-line no-unused-vars
            $currentBalance = await Balance.setBalance(parseFloat(changeMoneyInput.getValue()));
        } catch (error) {
            requestError = error;
        } finally {
            balanceUpdateInProgress = false;
        }
    }

    async function onEnterPress(event) {
        if (event.key === 'Enter') {
            await changeBalance();
            goto('/balance');
        }
    }
</script>

<ErrorModal error={requestError} />
<section class="section">
    <div class="has-text-centered">
        <ShowBalance />

        <TextField
            bind:this={changeMoneyInput}
            type="number"
            placeholder="0"
            decoration="€"
            label="Neues Guthaben"
            on:keydown={onEnterPress}
            disabled={balanceUpdateInProgress}
        />

        <Button
            text="Guthaben anpassen"
            class="is-primary mt-3"
            size="medium"
            on:click={changeBalance}
            isLoading={balanceUpdateInProgress}
        />
        <br />
        <Button href="/balance" text="Abbruch" class="is-danger mt-3" size="medium" />
        <br />
    </div>
</section>
<div class="container has-text-centered mt-6">
    <Button href="/" text="Zur Hauptseite" class="is-link" size="medium" />
</div>
