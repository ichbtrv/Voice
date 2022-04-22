<script lang="ts">
    import { notesInit } from '../../stores/notes';
    export let noteContent: string;

    let title = '';
    let buttonText = 'Save';

    function handleNote() {
        notesInit(title, noteContent);
        buttonText = 'Saved!';
    }
</script>

<section class="flex flex-col h-full justify-evenly">
    <div>
        <label for="title">Add a title: </label>
        <input
            type="text"
            name="title"
            class="border-b border-teal-400 "
            bind:value={title}
        />
    </div>
    <textarea
        value={noteContent}
        class="h-56 w-full mt-2 border rounded border-teal-400 p-2"
    />
    <button
        type="submit"
        name="save"
        class="rounded border py-2 border-teal-400 
        {buttonText === 'Save' ? '' : 'text-green-600'}
        "
        on:click={handleNote}>{buttonText}</button
    >
</section>
