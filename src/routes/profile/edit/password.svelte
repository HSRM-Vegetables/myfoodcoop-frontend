<script>
    import { title, navBalance } from '../../../stores/page';
    import Button from '../../../components/common/Button.svelte';
    import { userName } from '../../../stores/user';
    import { userDetails } from '../../../stores/userDetails';
    import UserEdit from '../../../components/user/UserEdit.svelte';

    // eslint-disable-next-line prefer-const, no-unused-vars
    $title = 'Passwort ändern';
    // eslint-disable-next-line prefer-const, no-unused-vars
    $navBalance = 'hidden';
</script>

<div class="is-size-3 has-text-weight-bold pb-5">{$userName}</div>

{#if $userDetails}
    <UserEdit user={$userDetails} password={true} />

    <div class="has-text-centered">
        <Button goHome={true} size="full-width" />
    </div>
{/if}
