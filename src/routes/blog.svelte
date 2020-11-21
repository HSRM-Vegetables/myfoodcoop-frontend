<script>
    import MassiveCalculator from '../scipts/MassiveCalculator';
    import { titleWithSuffix } from '../stores/page';

    const mc = new MassiveCalculator();
    mc.print();
</script>

<svelte:head>
	<title>{$titleWithSuffix}Blog</title>
</svelte:head>

Du bist im Blog und diese Seite ist nur eine Demo für eine Seite!😊