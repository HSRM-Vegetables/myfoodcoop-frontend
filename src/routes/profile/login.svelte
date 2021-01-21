<script>
    import { stores, goto } from '@sapper/app';
    import { title, navBalance } from '../../stores/page';
    import TextField from '../../components/common/TextField.svelte';
    import Button from '../../components/common/Button.svelte';
    import User from '../../scripts/user/User';
    import ErrorModal from '../../components/common/ErrorModal.svelte';

    const { page } = stores();
    const { returnUrl } = $page.query;

    let userNameInput;
    let passwordInput;
    let allowLogin = false;
    let requestError;
    let isLoggingIn = false;

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Login';
    $navBalance = 'hidden';

    async function login() {
        isLoggingIn = true;
        try {
            const response = await User.login(userNameInput.getValue(), passwordInput.getValue());
            User.handleTokens(response.token, response.refreshToken);
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

<h1 class="title has-text-centered">Willkommen zur Stadtgemüse Einkaufsapp</h1>
<p>
    Damit wir Dich während des Einkaufs identifizieren können, und Dir das beste Einkaufserlebnis bieten können,
    benötigen wir Benutzername und Passwort:
</p>

<br />

{#if requestError && requestError.errorCode === 401004}
    <article class="message is-danger">
        <div class="message-body">Benutzername oder Passwort nicht korrekt!</div>
    </article>
{:else}
    <ErrorModal error={requestError} />
{/if}

<TextField
    bind:this={userNameInput}
    type="text"
    label="Benutzername"
    placeholder="Benutzername"
    on:input={checkLoginStatus}
/>

<br />

<TextField
    bind:this={passwordInput}
    type="password"
    label="Passwort"
    placeholder="Passwort"
    on:input={checkLoginStatus}
/>

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
