<script>
    import { goto } from '@sapper/app';
    import TextField from '../common/TextField.svelte';
    import Balance from '../../scripts/Balance';
    import Button from '../common/Button.svelte';
    import ErrorModal from '../common/ErrorModal.svelte';
    import ShowBalance from './ShowBalance.svelte';
    
    let changeMoneyInput;
    let blanceUpdateInProgress = false;
    let requestError;
    const balance = new Balance();
    
    async function changeBalance() {
        blanceUpdateInProgress = true;

        try {
            balance.currentBalance = await balance.setBalance(changeMoneyInput.getValue());
        } catch (error) {
            requestError = error;
        } finally {
            blanceUpdateInProgress = false;
        }
    }
    
    async function onEnterPress(event) {
        if (event.key === 'Enter') {
            await changeBalance();
            goto('/balance');
        }
    }
</script>

<section class="section">
    <div class="has-text-centered">
        <ShowBalance bind:currentBalance="{balance.currentBalance}" />

        <TextField bind:this={changeMoneyInput} type="number" placeholder="0" decoration="€" label="Neues Guthaben" onKeyDown={onEnterPress} />
        
        <Button text="Guthaben anpassen" class="is-primary mt-3" size="medium" on:click={changeBalance} isLoading={blanceUpdateInProgress} />
        <br />
        <Button href="/balance" text="Abbruch" class="is-danger mt-3" size="medium" />
        <br />

        <ErrorModal error={requestError} />
    </div>
</section>
<div class="container has-text-centered mt-6">
    <Button href="/" text="Zur Hauptseite" class="is-link" size="medium" />
</div>
