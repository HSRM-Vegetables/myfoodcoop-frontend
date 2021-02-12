<script>
    import { stores, goto } from '@sapper/app';
    import { title, navBalance, isPointOfSales } from '../../stores/page';
    import TextField from '../../components/common/TextField.svelte';
    import Button from '../../components/common/Button.svelte';
    import User from '../../scripts/user/User';
    import ErrorModal from '../../components/common/ErrorModal.svelte';
    import Switch from '../../components/common/Switch.svelte';
    import { keepLoggedIn } from '../../stores/user';
    import { ORGANIZATION_NAME, LEGAL_NOTICE_LINK } from '../../scripts/Config';

    const { page } = stores();
    // redirect to main page if no query parameter is provided
    const { returnUrl = '/', register } = $page.query;

    let userNameInput;
    let passwordInput;
    let allowLogin = false;
    let requestError;
    let isLoggingIn = false;

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Login';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';

    async function login() {
        isLoggingIn = true;
        try {
            await User.login(userNameInput.getValue(), passwordInput.getValue(), $keepLoggedIn);

            goto(returnUrl);
        } catch (error) {
            requestError = error;
        } finally {
            isLoggingIn = false;
        }
    }

    // enable the login button if both inputs are not empty
    function checkLoginStatus() {
        if (userNameInput.getValue() && passwordInput.getValue()) {
            allowLogin = true;
        } else {
            allowLogin = false;
        }
    }
</script>

{#if register}
    <article class="message is-primary">
        <div class="message-body">
            Danke für deine Registrierung, bitte wende dich an deinen Ansprechpartner bei
            {ORGANIZATION_NAME}
            um die Registrierung abzuschließen.
        </div>
    </article>
{/if}
<h1 class="title has-text-centered">Willkommen zur {ORGANIZATION_NAME} Einkaufsapp</h1>
<p>
    Damit wir Dich während des Einkaufs identifizieren können, und Dir das beste Einkaufserlebnis bieten können,
    benötigen wir Benutzername und Passwort:
</p>

<br />

{#if requestError}
    {#if requestError.errorCode === 401004}
        <article class="message is-danger">
            <div class="message-body">Benutzername oder Passwort nicht korrekt!</div>
        </article>
    {/if}
    {#if requestError.errorCode === 401011}
        <article class="message is-danger">
            <div class="message-body">
                Benutzerkonto ist noch nicht freigeschaltet! Bitte wende Dich an deinen Administrator
            </div>
        </article>
    {/if}
{:else}
    <ErrorModal error={requestError} />
{/if}

<TextField
    bind:this={userNameInput}
    type="text"
    label="Benutzername"
    placeholder="Benutzername"
    on:input={checkLoginStatus}
    on:enter={allowLogin && login}
/>

<br />

<TextField
    bind:this={passwordInput}
    type="password"
    label="Passwort"
    placeholder="Passwort"
    on:input={checkLoginStatus}
    on:enter={allowLogin && login}
/>

{#if !$isPointOfSales}
    <div class="columns is-mobile mt-3">
        <div class="column">Eingeloggt bleiben?</div>
        <div class="column has-text-right">
            <Switch twoColor={true} bind:checked={$keepLoggedIn} />
        </div>
    </div>
{/if}

<p class="mt-3 mb-1">Noch nicht registriert? <a href="/profile/register">Dann hole das hier nach!</a></p>

<div class="has-text-centered">
    <Button
        class="is-primary mt-3"
        text="Einloggen"
        size="full-width"
        isLoading={isLoggingIn}
        disabled={!allowLogin}
        on:click={login}
    />
</div>

{#if LEGAL_NOTICE_LINK}
    <div class="has-text-centered mt-6"><a href={LEGAL_NOTICE_LINK} target="_blank">Impressum</a></div>
{/if}
