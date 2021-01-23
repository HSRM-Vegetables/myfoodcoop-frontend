<script>
    import ListItem from "../common/ListItem.svelte";

    /**
     * The user to be displayed
     */
    export let user;
</script>

<style>
    .not-activated {
        color: red;
    }
</style>

<ListItem isClickable={true} on:click>
    <div class="columns is-mobile" class:not-activated={user.roles.length === 0}>
        <div class="column has-text-left ">{user.username}</div>
        <div class="column is-one-quarter has-text-right">{user.memberId}</div>
    </div>
</ListItem>