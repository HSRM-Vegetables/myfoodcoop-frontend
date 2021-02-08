<script>
    export let user;

    export let showRoles = false;
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
        <div class="column has-text-right">{user.memberId}</div>
    </div>
    <div class="columns">
        <div class="column is-size-5 has-text-weight-bold">Email:</div>
        <div class="column has-text-right">{user.email}</div>
    </div>
    {#if showRoles}
        <div class="columns">
            <div class="column is-size-5 has-text-weight-bold">Rollen:</div>
            <div class="column has-text-right">{user.roles.join(', ')}</div>
        </div>
    {/if}
{/if}
