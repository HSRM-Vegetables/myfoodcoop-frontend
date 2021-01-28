<script>
    import Cookie from 'js-cookie';
    import { mdiLogout } from '@mdi/js';
    import { title, navBalance } from '../../stores/page';
    import Button from '../../components/common/Button.svelte';
    import { userName, allowKeepLoggedIn, refreshToken, tokenExpires, refreshTokenExpires } from '../../stores/user';
    import { userDetails } from '../../stores/userDetails';
    import CookieDefaults from '../../scripts/CookieDefaults';
    import UserDetails from '../../components/user/UserDetails.svelte';
    import AuthorizeByRoles, { Roles } from '../../components/common/AuthorizeByRoles.svelte';
    import Switch from '../../components/common/Switch.svelte';
    import User from '../../scripts/user/User';

    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
    $navBalance = 'show';

    let isLoggingOut = false;

    $: {
        // disallow of the future use of the keep logged in workflow
        localStorage.setItem(CookieDefaults.ALLOW_KEEP_LOGGED_IN, $allowKeepLoggedIn);

        if ($allowKeepLoggedIn === false) {
            // if its not allow to stay logged in, disable this workflow explicitly
            localStorage.setItem(CookieDefaults.KEEP_LOGGED_IN, false);
        }
    }

    async function logout() {
        try {
            isLoggingOut = true;

            // logout on the server
            if ($refreshTokenExpires > new Date()) {
                // only logout on the server if the refresh token is still valid

                if ($tokenExpires < new Date()) {
                    // if the token expired get a new one
                    await User.refreshToken($refreshToken);
                }

                // revoke the refresh token
                await User.revokeRefreshToken($refreshToken);
            }
        } catch (error) {
            // catch errors, but do not show it to the user
        } finally {
            // logout on the client
            Cookie.remove(CookieDefaults.TOKEN);
            Cookie.remove(CookieDefaults.REFRESH_TOKEN);

            // reload the page
            window.location.href = '/';

            isLoggingOut = false;
        }
    }
</script>

<div class="is-size-3 has-text-weight-bold pb-5">{$userName}</div>

{#if $userDetails}
    <UserDetails user={$userDetails} showRoles={true} />

    <AuthorizeByRoles allowedRoles={[Roles.ADMIN]} displayPermissionNotAllowed={false}>
        <hr />

        <div class="columns is-mobile mt-3">
            <div class="column">
                Eingeloggt bleiben auf diesem Gerät aktivieren? Wichtig: Wirkt sich erst ab dem nächsten Login aus.
                Diese Einstellung ist Geräteabhängig.
            </div>
            <div class="column has-text-right">
                <Switch twoColor={true} bind:checked={$allowKeepLoggedIn} />
            </div>
        </div>

        <hr />
    </AuthorizeByRoles>

    <div class="container has-text-centered mt-6">
        <Button
            text="Ausloggen"
            class="is-danger mb-3"
            on:click={logout}
            size="full-width"
            isLoading={isLoggingOut}
            icon={mdiLogout}
        />
        <br />
        <Button goHome={true} size="full-width" />
    </div>
{/if}
