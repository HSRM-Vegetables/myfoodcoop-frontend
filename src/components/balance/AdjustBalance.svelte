<script>
    import { goto } from '@sapper/app';
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
            balance.currentBalance = await balance.setBalance(changeMoneyInput.value);
            goto('/balance');
        } catch (error) {
            requestError = error;
        } finally {
            blanceUpdateInProgress = false;
        }
    }
    
    function onEnterPress(event) {
        if (event.key === 'Enter') {
            changeBalance();
            goto('/balance');
        }
    }
</script>

<style>
    .fix-button-width{
        width: 230px;
    }
    .balance-input-deco{
        position: absolute;
        font-size: 1rem;
        color: #ccc6c6;
        right: 30px;
        top: 8px;
    }
</style>

<section class="section">
    <div class="has-text-centered">
        <ShowBalance bind:currentBalance="{balance.currentBalance}" />
        <div class="mt-6">
            <div class="has-text-left pb-2">Neues Guthaben</div>
            <div class=" is-relative">
                <input type="number" class="input balance-input" bind:this={changeMoneyInput} placeholder="0" on:keydown="{onEnterPress}" />  
                <span class="balance-input-deco">€</span>
            </div>
        </div>

        <Button text="Guthaben anpassen" class="is-primary mt-3" size="medium" on:click={changeBalance} isLoading={blanceUpdateInProgress} />
        <br />
        <a href="/balance" type="submit" class="button is-danger fix-button-width mt-3">Abbruch</a><br>
        <br />

        <ErrorModal error={requestError} />
    </div>
</section>
<div class="container has-text-centered mt-6">
    <Button href="/" text="Zur Hauptseite" class="is-link" size="medium" />
</div>
