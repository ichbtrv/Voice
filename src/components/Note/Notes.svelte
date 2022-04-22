<script lang="ts">
    import { onMount } from 'svelte';
    import Note from './Note.svelte';
    import { notesRestore, notes } from '../../stores/notes';

    export let notesVisible: boolean;
    let prevNotes: boolean;

    onMount(async () => (prevNotes = await notesRestore()));
</script>

<section
    class="flex mx-4 text-xl px-4 py-2 w-20 justify-center text-white bg-teal-300 rounded"
>
    <button on:click={(e) => (notesVisible = false)}>Back</button>
</section>
<section class="flex flex-wrap justify-center md:justify-start">
    {#if prevNotes}
        {#each $notes as note}
            <Note title={note.title} body={note.body} date={note.date} />
        {/each}
    {/if}
</section>
