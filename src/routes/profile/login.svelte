<script>
    import Cookie from 'js-cookie';
    import { stores, goto } from '@sapper/app';
    import { title } from '../../stores/page';
    import { name } from '../../stores/user';
    import CookieDefaults from '../../scripts/CookieDefaults';

    const { page } = stores();
    const { returnUrl } = $page.query;

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Login';

    function saveName() {
        // create cookie that expires after 7 days
        Cookie.set(CookieDefaults.NAME, $name, { expires: 7 });
        goto(returnUrl);
    }
</script>

<h1 class="title has-text-centered">Willkommen zur Stadtgemüse Einkaufsapp</h1>
<p>
    Damit wir dich während des Einkaufen identifizieren können, und dir das beste Einkaufserlebnis bieten können,
    brauchen wir deinen Namen:
</p>

<input type="text" class="input mt-3" placeholder="Name" bind:value={$name} />

<div class="has-text-centered">
    <!-- I don't use an a-tag here, because its harder to disable an a-tag -->
    <button class="button is-primary mt-3" disabled={$name === ''} on:click={saveName}>Einloggen</button>
</div>
