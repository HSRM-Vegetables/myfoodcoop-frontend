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

    /**
     * True if the icon should be displayed in the appbar
     */
    export let appbar = false;

    /**
     * True if the icon should be displayed small
     */
    export let small = false;

    /**
     * True if the icon should be displayed green
     */
    export let green = false;
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
    .green {
        color: green;
    }
    .small {
        width: 25px;
        height: 25px;
    }
</style>

<!-- Use an svg to display the icon path from the parameter -->
<svg class:appbar class:green class:small viewbox="0 0 24 24">
    <!-- Give the path the value currentColor, so it inherits the text-color of its parent -->
    <path fill="currentColor" d={icon} />
</svg>
