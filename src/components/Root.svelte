<script lang="ts">
    import Container from './Container/Container.svelte';
    import Notes from './Note/Notes.svelte';
    import NavBar from './NavBar/NavBar.svelte';

    let playing = false;
    let recording = false;
    let stopped = false;
    let counter = 0;
    let duration = 0;
    let modalVisible = false;
    let notesVisible = false;
</script>

<main class="flex flex-col justify-center w-[100vw]">
    <NavBar
        on:play={(e) => {
            playing = true;
        }}
        on:pause={(e) => {
            playing = false;
        }}
        on:recording={(e) => {
            recording = !recording;
        }}
        bind:stopped
        bind:counter
        bind:duration
        bind:modalVisible
        bind:notesVisible
    />
    {#if !notesVisible}
        <Container
            bind:playing
            bind:recording
            bind:counter
            bind:duration
            bind:modalVisible
            on:stop={(e) => {
                stopped = true;
            }}
        />
    {:else}
        <Notes bind:notesVisible />
    {/if}
</main>
