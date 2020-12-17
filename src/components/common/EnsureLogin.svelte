<script>
    import { goto, stores } from '@sapper/app';
    import { onMount } from 'svelte';
    import { name } from '../../stores/user';

    const { page } = stores();

    onMount(() => {
        console.log($page)
        if (!$name && !$page.error && !$page.path.includes('/login')) {
            goto(`/profile/login?returnUrl=${$page.path}`);
        }
    });
</script>