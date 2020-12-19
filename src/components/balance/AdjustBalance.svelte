<script>
    import { goto } from '@sapper/app';
    import TextField from '../common/TextField.svelte';
    import Balance from '../../scripts/Balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import ShowBalance from './ShowBalance.svelte';

    let changeMoneyInput;
    let balanceUpdateInProgress = false;
    let requestError;
    const balance = new Balance();

    async function changeBalance() {
        balanceUpdateInProgress = true;

        try {
            balance.currentBalance = await balance.setBalance(parseFloat(changeMoneyInput.getValue()));
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
        <ShowBalance bind:currentBalance={balance.currentBalance} />

        <TextField
            bind:this={changeMoneyInput}
            type="number"
            placeholder="0"
            decoration="€"
            label="Neues Guthaben"
            onKeyDown={onEnterPress}
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
