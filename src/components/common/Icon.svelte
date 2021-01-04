<!-- 
    Intended usage: 

    import { mdiGithub } from '@mdi/js'
    <button class="button is-primary">
        <span class="icon">
            <Icon icon={mdiGithub}/>
        </span>
        <span>GitHub</span>
    </button>
 -->
<script>
    /**
     * Should contain an SVG icon path, preferably imported from '@mdi/js'
     */
    export let icon;

    export let appbar;
</script>

<style>
    svg {
        width: 100%;
        height: 100%;
    }
    .appbar {
        width: 40px;
        height: 40px;
    }
</style>

<!-- Use an svg to display the icon path from the parameter -->
<svg class:appbar viewbox="0 0 24 24">
    <!-- Give the path the value currentColor, so it inherits the text-color of its parent -->
    <path fill="currentColor" d={icon} />
</svg>
