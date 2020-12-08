<script>
    import { title } from '../../stores/page';
    import { name } from '../../stores/user';
    
    /* eslint-disable prefer-const */
    /* eslint-disable no-unused-vars */
    $title = 'Profil';
</script>

<span>Name:</span>
<input type="text" class="input" bind:value="{$name}">

<a class="button is-primary mt-1" href="/">Save</a>
