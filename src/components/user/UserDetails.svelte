<script>
    export let user;

    export let showRoles = false;

    export let version;
</script>

{#if user}
    {#if user.isDeleted}
        <article class="message is-danger">
            <div class="message-body">Der Benutzer wurde gelöscht.</div>
        </article>
    {/if}
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">Benutzername:</div>
        <div class="column has-text-right">{user.username}</div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">Mitgliedsnummer:</div>
        <div class="column has-text-right break-all">{user.memberId}</div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">Email:</div>
        <div class="column has-text-right">{user.email}</div>
    </div>
    {#if showRoles}
        <div class="columns is-mobile">
            <div class="column is-size-5 has-text-weight-bold">Rollen:</div>
            <div class="column has-text-right">{user.roles.join(', ')}</div>
        </div>
    {/if}
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">App Version:</div>
        <div class="column has-text-right">{version}</div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">Support-Mail:</div>
        <div class="column has-text-right">
            <a href="mailto:technik@stadtgemuese-wiesbaden.de">technik@stadtgemuese-wiesbaden.de</a>
        </div>
    </div>
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">WECHANGE:</div>
        <div class="column has-text-right">
            <a href="https://wechange.de/group/stadtgemuese-wiesbaden/" target="_blank">Stadtgemüse Wiesbaden</a>
        </div>
    </div>
{/if}
