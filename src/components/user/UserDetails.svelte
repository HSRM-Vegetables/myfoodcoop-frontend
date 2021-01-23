<script>
    export let user;
</script>

{#if user}
    <div class="columns is-mobile">
        <div class="column is-size-5 has-text-weight-bold">Mitgliedsnummer:</div>
        <div class="column has-text-right">{user.memberId}</div>
    </div>
    {#if user.email !== undefined}
        <div class="columns">
            <div class="column is-size-5 has-text-weight-bold">Email:</div>
            <div class="column has-text-right">{user.email}</div>
        </div>
    {/if}
{/if}