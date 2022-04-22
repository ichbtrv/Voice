<script lang="ts">
    import NewNote from '../Note/NewNote.svelte';
    import ModalButton from './ModalButton.svelte';

    export let visible: boolean;
    export let noteContent: string;

    let onHide: () => void;
    let bgOverlay = true;
</script>

<svelte:window on:click={onHide} />

{#if visible}
    <div
        class="z-10 top-24 fixed inset-0"
        role="dialog"
        aria-modal="true"
        on:click|stopPropagation
    >
        <div
            class="flex items-center justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            {#if bgOverlay}
                <div
                    on:click={onHide}
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                />
            {/if}

            <div
                class="inline-block h-96 w-96 border align-bottom bg-white p-4 text-left rounded-lg transform shadow-xl sm:align-middle sm:max-w-lg sm:w-full"
            >
                <ModalButton bind:visible />
                <NewNote bind:noteContent />
            </div>
        </div>
    </div>
{/if}
