<script lang="ts">
    import * as Icon from '../Icon';
    import { createEventDispatcher } from 'svelte';

    export let stopped: boolean;
    export let counter: number;
    export let duration: number;
    export let modalVisible: boolean;
    export let notesVisible: boolean;

    const dispatch = createEventDispatcher();

    $: paused = true;
    $: recording = false;

    function play(event) {
        paused = false;
        dispatch('play', event.detail);
    }

    function pause(event) {
        paused = true;
        dispatch('pause', event.detail);
    }

    function startRecording(event) {
        recording = true;
        dispatch('recording', event.detail);
    }
    function stopRecording(event) {
        recording = false;
        dispatch('recording', event.detail);
    }

    $: if (stopped) {
        pause(event);
        stopped = false;
    }
</script>

<section class="flex justify-between">
    <nav class=" flex px-2 py-2">
        {#key paused}
            {#if paused}
                <li
                    class="hover:bg-teal-300 hover:text-white  group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    on:click|preventDefault={play}
                >
                    <Icon.PlayButton />
                </li>
            {:else}
                <li
                    class="hover:bg-teal-300 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    on:click|preventDefault={pause}
                >
                    <Icon.Stop />
                </li>
            {/if}
        {/key}
        {#key recording}
            <li
                class="hover:text-white 
                    {recording
                    ? 'bg-red-500 bg-opacity-10'
                    : 'hover:bg-teal-300'}
                flex items-center px-2 py-2 text-sm font-medium rounded-md"
                on:click={(e) =>
                    recording ? stopRecording(e) : startRecording(e)}
            >
                <Icon.Record fill={recording ? 'red' : 'black'} />
            </li>
        {/key}

        <li
            class="text-gray-300 hover:bg-teal-300 hover:text-white text-black group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            on:click={(e) => (modalVisible = true)}
        >
            <Icon.Save />
        </li>
        <li
            class="text-gray-300 hover:bg-teal-300 mx-1  hover:text-white text-black group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            on:click={(e) => (notesVisible = true)}
        >
            <Icon.Folder />
        </li>
    </nav>
    <div class="text-black text-center px-2 py-2 mt-2 text-2xl">
        {counter} of
        <span class={recording ? 'text-red-400' : ''}>{duration} seconds</span>
    </div>
</section>
